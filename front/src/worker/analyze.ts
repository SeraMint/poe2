import stringComparison from 'string-comparison';
import { CompareParams, ResultStat as Stat } from '../types/analyze';

const lev = stringComparison.levenshtein;

const similarity = (a: string, b: string) => {
  return lev.similarity(a, b);
};
const distance = (a: string, b: string) => {
  return lev.distance(a, b);
};

const simplify = (sentense: string) => {
  return sentense
    .replace(/([+-]?)([0-9.]{2,}|[0-9]{1,})((\([0-9.-]{1,}\))?)(%?)/gi, '#')
    .replace(/[^가-힣#]/gi, '');
};

const parseValues = (
  standard: string,
  target: string,
  onlyPositive = false
) => {
  const values: Array<number> = [];
  (standard.match(/#/gi) ?? []).some((_, i) => {
    const matchValues = Array.from(
      onlyPositive
        ? target.matchAll(
            /([+]?)([0-9.]{2,}|[0-9]{1,})((\([0-9.-]{1,}\))?)(%?)/gi
          )
        : target.matchAll(
            /([+-]?)([0-9.]{2,}|[0-9]{1,})((\([0-9.-]{1,}\))?)(%?)/gi
          )
    );

    if (matchValues[i]?.[2])
      values.push(
        isNaN(Number(`${matchValues[i]?.[1]}${matchValues[i]?.[2]}`))
          ? 0
          : Number(`${matchValues[i]?.[1]}${matchValues[i]?.[2]}`)
      );
  });

  return values;
};

self.onmessage = (event) => {
  const { standard, target, type, onlyPositive }: CompareParams = JSON.parse(
    event.data
  );
  const result: Array<Stat> = [];

  target.forEach((t) => {
    const stat: Stat = { text: t, similar: [] };

    standard.some((s) => {
      if (!simplify(t).replace(/#/gi, '').trim()) return true;

      const rate = similarity(simplify(s), simplify(t));
      const dist = distance(simplify(s), simplify(t));

      // if (simplify(s).indexOf('공격시화염') !== -1)
      //   console.log(simplify(s), simplify(t), s, t, rate);

      if (rate >= 0.5 && dist <= 3) {
        stat.similar.push({ type, text: s, rate, distance: dist, values: [] });

        if (rate === 1) return true;
      }

      return false;
    });

    result.push(stat);
  });

  result.forEach((r) => {
    r.similar.sort((a, b) => b.rate - a.rate || a.distance - b.distance);
    r.similar.splice(1, r.similar.length);

    if (r.similar[0])
      r.similar[0].values = parseValues(
        r.similar[0].text,
        r.text,
        onlyPositive
      );
  });

  self.postMessage(result);
};
