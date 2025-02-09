import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import { ImageLike, createWorker } from 'tesseract.js';
import { useQuery } from '@tanstack/react-query';
import {
  CreateParam,
  ResultStat,
  CompareParams,
  ResultFile,
  FilterGroup
} from '../types/analyze';
import { Filter, FilterData } from '../types/analyze';
import { ResultData } from '../types/analyze';

import AnalyzeWorker from '../worker/analyze?worker';

// import { filters } from '../data/filters.ko';
// import { stats as filterStats } from '../data/stats.ko';
// import { items as filterItems } from '../data/items.ko';
// import { level, requires, quility, damage, range, etc } from '../data/added.ko';

import { Process } from './Process';
import styles from './Analyze.module.css';

interface ChildProps {
  onItemChange: (data: ResultData) => void;
}

let onGlobalItemChange: (data: ResultData) => void;

const filter: FilterData = {
  rarity: [],
  category: [],
  stats: [],
  items: [],
  uniques: []
};

const recognize = async (image: ImageLike): Promise<string> => {
  const locale = ['kor'];
  const worker = await createWorker(locale);
  //   const worker = await createWorker(locale, 1, {
  //     workerPath:
  //       'https://cdn.jsdelivr.net/npm/tesseract.js@v5.1.0/dist/worker.min.js',
  //     langPath: 'https://cdn.jsdelivr.net/gh/seraMint/tessdata/',
  //     corePath: 'https://cdn.jsdelivr.net/npm/tesseract.js-core@v5.1.0',
  //     cacheMethod: prod ? 'write' : 'none'
  //   });

  await worker.setParameters({
    preserve_interword_spaces: '1'
  });

  let whiteText = '';

  try {
    const {
      data: { text }
    } = await worker.recognize(image);

    whiteText = text
      .replace(/[^0-9가-힣 %+-~.(),\n]/gi, '')
      .replace(/[ ]{2,}/gi, ' ');
  } catch (e) {
    // 실패
    console.log(e);
  } finally {
    await worker.terminate();
  }

  return whiteText;
};

const getFilterCategory = async () => {
  const filters = (await import('../data/filters.ko'))
    .default as unknown as Array<FilterGroup>;
  const filterStats = (await import('../data/stats.ko'))
    .default as unknown as Array<Filter>;
  const filterItems = (await import('../data/items.ko'))
    .default as unknown as Array<Filter>;
  const { level, requires, quility, damage, range, etc } = await import(
    '../data/added.ko'
  );

  const findFilters =
    filters.find((f) => f.id === 'type_filters')?.filters ??
    ([] as Array<Filter>);

  const rarityByFilter =
    findFilters
      .find((f) => f.id === 'rarity')
      ?.option?.options.map((o) => ({
        value: o.id,
        label: o.text
      })) ?? [];

  const categoryinFilter =
    findFilters
      .find((f) => f.id === 'category')
      ?.option?.options.map((o) => ({
        value: o.id,
        label: o.text
      })) ?? [];

  const categoryInItem =
    (filterItems as Array<Filter>).map((fi) => ({
      value: fi.id,
      label: fi.label
    })) ?? [];

  const categoryByFilter =
    [
      ...[...categoryinFilter, ...categoryInItem].map(
        (c) => `${c.label}${level[0]}`
      ),
      ...requires,
      ...quility,
      ...damage,
      ...range,
      ...etc
    ].map((c, i) => ({ value: `category_${i}`, label: c })) ?? [];

  const statsByFilter =
    filterStats
      .map((s) => s.entries)
      .flat()
      .filter((e) => /[가-힣]/gi.test(e.text))
      .map((e) => ({ value: e.id, label: e.text })) ?? [];

  const itemsByFilter =
    filterItems
      .map((i) => i.entries)
      .flat()
      .map((e, idx) => ({ value: `${idx}`, label: e.type ?? '' })) ?? [];

  const uniquesByFilter =
    filterItems
      .map((i) => i.entries)
      .flat()
      .filter((e) => !!e.flags?.unique && !!e.name)
      .map((e, idx) => ({ value: `${idx}`, label: e.name ?? '' })) ?? [];

  return {
    rarityByFilter,
    categoryByFilter,
    statsByFilter,
    itemsByFilter,
    uniquesByFilter
  };
};

const compare = (params: CompareParams): Promise<Array<ResultStat>> => {
  return new Promise((resolve, reject) => {
    const worker = new AnalyzeWorker();
    worker.onmessage = (event) => {
      worker.terminate();
      resolve(event.data);
    };

    try {
      worker.postMessage(JSON.stringify(params));
    } catch (e) {
      worker.terminate();
      reject(e);
    }
  });
};

const parse = (
  target: Array<string>
): Promise<[Array<ResultStat>, Array<ResultStat>, Array<ResultStat>]> => {
  return new Promise((resolve) => {
    Promise.all([
      compare({
        standard: filter.items.map((i) => i.label),
        target,
        type: 'category'
      }),
      compare({
        standard: filter.category.map((c) => c.label),
        target,
        type: 'static',
        onlyPositive: true
      }),
      compare({
        standard: filter.stats.map((s) => s.label),
        target,
        type: 'stat'
      })
    ]).then(
      (result: [Array<ResultStat>, Array<ResultStat>, Array<ResultStat>]) => {
        resolve(result);
      }
    );
  });
};

const analyzing = async (text: Array<string>) => {
  if (text.length === 0) return;

  const currentParam: CreateParam = {
    name: '',
    rarity: '',
    category: '',
    statics: [],
    staticsValues: [],
    stats: [],
    statValues: []
  };

  const [data1, data2, data3] = await parse(text);

  //console.log(data1, data2, data3);
  data1.some((d, i) => {
    if (d.similar[0] && d.similar[0].type === 'category') {
      currentParam.category = d.similar[0].text;
      currentParam.name = (
        data1
          .slice(0, i)
          .map((d) => d.text)
          .join(' ') ?? ''
      )
        .replace(/[^가-힣 ]/gi, '')
        .replace(/[ ]{1,}/gi, ' ')
        .trim();

      if (data1[i + 1]?.similar[0]) {
        currentParam.statics.push(data1[i + 1]?.similar[0]?.text);
        currentParam.staticsValues.push(data1[i + 1]?.similar[0]?.values);
      }

      return true;
    }

    return false;
  });

  const staticWithStatsData = data2.reduce(
    (acc: Array<ResultStat>, c: ResultStat, i) => {
      c.similar = [...c.similar, ...data3[i].similar];
      c.similar.sort((a, b) => b.rate - a.rate || a.distance - b.distance);
      acc.push(c);
      return acc;
    },
    []
  );

  currentParam.statics.push(
    ...staticWithStatsData
      .filter((d) => !!d.similar[0] && d.similar[0].type === 'static')
      .map((d) => d.similar[0].text)
  );
  currentParam.staticsValues.push(
    ...staticWithStatsData
      .filter((d) => !!d.similar[0] && d.similar[0].type === 'static')
      .map((d) => d.similar[0].values ?? [])
  );

  currentParam.stats.push(
    ...staticWithStatsData
      .filter((d) => !!d.similar[0] && d.similar[0].type === 'stat')
      .map((d) => d.similar[0].text)
  );
  currentParam.statValues.push(
    ...staticWithStatsData
      .filter((d) => !!d.similar[0] && d.similar[0].type === 'stat')
      .map((d) => d.similar[0].values ?? [])
  );

  const matchUnique = await compare({
    standard: filter.uniques.map((q) => q.label),
    target: [currentParam.name]
  });

  currentParam.rarity =
    matchUnique[0]?.similar?.[0] &&
    matchUnique[0]?.similar?.[0].rate >= 0.8 &&
    matchUnique[0]?.similar?.[0].distance <= 3
      ? 'unique'
      : currentParam.stats.length >= 3
      ? 'rare'
      : currentParam.stats.length >= 1
      ? 'magic'
      : 'normal';

  //console.log(currentParam);
  return currentParam;
};

const onComplete = async (data: ResultFile, cb?: () => void) => {
  const objectUrl = URL.createObjectURL(data.processed);
  const image = new Image();
  image.onload = async () => {
    const text = await recognize(image);
    //console.log(text);
    const param = await analyzing(text.split(/\n/).filter((s) => !!s.trim()));
    if (param) onGlobalItemChange({ origin: data.origin, param });
    URL.revokeObjectURL(objectUrl);
    cb?.();
  };
  image.src = objectUrl;
};

export const Analyze: React.FC<ChildProps> = ({ onItemChange }) => {
  const processRef = useRef<HTMLInputElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const [disable, setDisable] = useState(true);
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['filterQuery'],
    queryFn: async () => await getFilterCategory(),
    staleTime: Infinity,
    structuralSharing: true,
    initialData: () => {
      const filterData = localStorage.getItem('filterData');

      if (!!filterData) Object.assign(filter, JSON.parse(filterData));

      return filter.category.length === 0 ||
        filter.items.length === 0 ||
        filter.rarity.length === 0 ||
        filter.stats.length === 0 ||
        filter.uniques.length === 0
        ? undefined
        : null;
    }
  });

  useEffect(() => {
    if (isSuccess) {
      filter.rarity.push(...(data?.rarityByFilter ?? []));
      filter.category.push(...(data?.categoryByFilter ?? []));
      filter.items.push(...(data?.itemsByFilter ?? []));
      filter.stats.push(...(data?.statsByFilter ?? []));
      filter.uniques.push(...(data?.uniquesByFilter ?? []));

      setDisable(false);

      localStorage.setItem('filterData', JSON.stringify(filter));
    }
  }, [isSuccess]);

  const injectFile = (file?: File) => {
    if (!file) return;
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);

    if (!processRef.current?.files) return;

    processRef.current.files = dataTransfer.files;
    const event = new Event('change', { bubbles: true });
    processRef.current.dispatchEvent(event);
  };

  const onDrop = (event: DragEvent) => {
    event.preventDefault();

    if (disable) return;

    injectFile(event.dataTransfer?.files?.[0]);
  };

  const onDragOver = (event: DragEvent) => {
    event.preventDefault();
  };

  const onPaste = (event: ClipboardEvent) => {
    event.preventDefault();

    if (disable) return;

    injectFile(event.clipboardData?.files?.[0]);
  };

  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (disable) return;

    processRef.current?.click();
  };

  useEffect(() => {
    onGlobalItemChange = onItemChange;

    const dropArea = dropRef.current;

    if (!dropArea) return;

    dropArea.addEventListener('drop', onDrop);
    dropArea.addEventListener('dragover', onDragOver);
    document.body.addEventListener('paste', onPaste);

    return () => {
      dropArea.removeEventListener('drop', onDrop);
      dropArea.removeEventListener('dragover', onDragOver);
      document.body.removeEventListener('paste', onPaste);
    };
  }, []);
  return isLoading ? (
    <div>로딩 중...</div>
  ) : (
    <>
      <Process
        ref={processRef}
        onDisable={() => {
          setDisable(true);
        }}
        onComplete={async (data) => {
          await onComplete(data, () => {
            setDisable(false);
          });
        }}
      />
      <div
        ref={dropRef}
        className={`${styles.dropArea} ${disable ? styles.disable : ''}`}
        onClick={onClick}
      >
        <p>드래그 & 드롭 또는 파일 선택</p>
        <p>
          이곳에 아이템 이미지를 드롭 하거나 클립보드에 복사된 아이템 이미지를
          붙여넣기 하세요
        </p>
      </div>
    </>
  );
};
