import React, { useEffect, useState } from 'react';
import { get, post } from '../api';
import './Test.css';

const getTags = async () => {
  const tags = await get('/api/tag/list');

  return tags;
};

const getCategory = async () => {
  const category = await get('/api/category/list');

  if (category?.message) {
    console.log(category?.message);
    return [];
  }

  return category;
};

const getItems = async (page: number = 0, rows: number = 10) => {
  const items = await get(`/api/item/list?page=${page}&rows=${rows}`);

  if (items?.message) {
    console.log(items?.message);
    return [];
  }

  return items?.content ?? [];
};

const options = [
  '잘못된태그@@',
  '반지',
  '지능',
  '마나',
  '정신력',
  '지팡이',
  '육척봉',
  '증가',
  '감소',
  '신성한',
  '물리적',
  '소환수'
];

const stats = ['마나 최대치 #', '생명력 최대치 #', '잘못된 능력치@'];

const addTag = async (name: string) => {
  await post('/api/tag/add', { name });
};

const createItem = async (
  categoryId: string,
  stats: Array<string>,
  tagNames: Array<string>,
  cb: () => void
) => {
  await post('/api/item/create', { categoryId, stats, tagNames });

  cb?.();
};

type Tag = {
  id?: number;
  name: string;
};

type Category = {
  id: string;
  name: string;
};

type Stat = {
  id: string;
  contents: string;
};

type Item = {
  id?: number;
  categoryId: string;
  stats: Array<Stat>;
  tags: Array<Tag>;
};

export const Test = () => {
  const [tagName, setTagName] = useState('');
  const [tagNames, setTagNames] = useState<Array<string>>([]);
  const [curentCategory, setCurrentCategory] = useState<string>('claw');
  const [category, setCategory] = useState<Array<Category>>([]);
  const [selectedStats, setSelectedStats] = useState<Array<string>>([]);
  const [items, setItems] = useState<Array<Item>>([]);

  const update = (e: React.FormEvent<HTMLInputElement>) => {
    setTagName(e.currentTarget.value);
  };

  const onChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentCategory(e.target.value);
  };

  const onChangeStat = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStats([...e.target.selectedOptions].map((o) => o.value));
  };

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTagNames([...e.target.selectedOptions].map((o) => o.value));
  };

  const getCategoryList = () => {
    getCategory().then((data) => {
      setCategory(data);
    });
  };

  const getItemsList = () => {
    getItems(1, 10).then((data) => {
      setItems(data);
    });
  };

  useEffect(() => {
    console.log('test');
    getCategoryList();
    getItemsList();
  }, []);

  return (
    <>
      <button onClick={getTags}>Get Tags</button>
      <div>
        <input type="text" value={tagName} onInput={update} />
        <button onClick={async () => addTag(tagName)}>Set Tags</button>
      </div>
      <div>
        <select onChange={onChangeCategory}>
          {category.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <select multiple onChange={onChangeStat}>
          {stats.map((s, i) => (
            <option key={i} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select multiple onChange={onChange}>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <div>선택된 이름 {tagNames.join(', ')}</div>
        <button
          onClick={async () =>
            createItem(curentCategory, selectedStats, tagNames, getItemsList)
          }
        >
          아이템 추가
        </button>
        <button onClick={getItemsList}>아이템 리스트</button>
        <ul>
          {items.map((i) => (
            <li key={i.id} className="item">
              <div>{category.find((c) => c.id === i.categoryId)?.name}</div>
              <ol>
                {i.tags.map((t) => (
                  <li key={t.id}>{t.name}</li>
                ))}
              </ol>
              <ol>
                {i.stats.map((s) => (
                  <li key={s.id}>{s.contents}</li>
                ))}
              </ol>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
