import React, { useCallback, useRef, useState } from 'react';

import { CreateParam, ResultData } from '../types/analyze';

import './css/Create.css';

import { Analyze } from '../component/Analyze';

// const getItems = async (page: number = 0, rows: number = 10) => {
//   const items = await get(`/api/item/list?page=${page}&rows=${rows}`);

//   if (items?.message) {
//     console.log(items?.message);
//     return [];
//   }

//   return items?.content ?? [];
// };

// const createItem = async (param: CreateParam, cb: () => void) => {
//   await post('/api/item/create', param);

//   cb?.();
// };

export const Create = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [param, setParam] = useState<CreateParam>({
    name: '',
    category: '',
    rarity: '',
    statics: [],
    staticsValues: [],
    stats: [],
    statValues: []
  });
  const onItemChange = useCallback((data: ResultData) => {
    if (data.origin) {
      const ctx = canvasRef.current?.getContext('2d');
      canvasRef.current!.width = data.origin.width;
      canvasRef.current!.height = data.origin.height;

      ctx?.drawImage(data.origin, 0, 0);
    }

    setParam(data.param);
  }, []);

  const handleStaticChange = (
    e: React.FormEvent<HTMLInputElement>,
    i: number,
    j: number
  ) => {
    const updatedStaticsValues = [...(param.staticsValues ?? [])];
    updatedStaticsValues[i][j] = isNaN(Number(e.currentTarget.value))
      ? 0
      : Number(e.currentTarget.value);

    setParam({ ...param, staticsValues: updatedStaticsValues });
  };

  const handleStatChange = (
    e: React.FormEvent<HTMLInputElement>,
    i: number,
    j: number
  ) => {
    const updateStatValues = [...(param.statValues ?? [])];
    updateStatValues[i][j] = isNaN(Number(e.currentTarget.value))
      ? 0
      : Number(e.currentTarget.value);

    setParam({ ...param, statValues: updateStatValues });
  };

  return (
    <div className="px-4 pt-10 pb-24 sm:px-6 xl:pr-0">
      <h2 className='text-3xl font-bold text-gray-900"'>
        아이템 이미지 인식기 v1.0.0
      </h2>
      <Analyze className="mt-5" onItemChange={onItemChange} />
      <div className="result">
        <canvas ref={canvasRef} />
        <div className={`item ${param.rarity} ${param.category && 'show'}`}>
          <div className="category">
            <div>{param.name}</div>
            <div>{param.category}</div>
          </div>
          <hr />
          <ul className="statics">
            {param.statics.map((s, i) => (
              <li key={`static-${i}`}>
                {s.split('#').map((sv, j) => {
                  return (
                    <React.Fragment key={`fragment-${i}-${j}`}>
                      <span key={`span-${i}-${j}`}>{sv}</span>
                      {j < param.staticsValues[i].length && (
                        <input
                          className="values"
                          key={`input-${i}-${j}`}
                          type="tel"
                          value={param.staticsValues[i][j]}
                          onInput={(e) => handleStaticChange(e, i, j)}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </li>
            ))}
          </ul>
          <hr />
          <ul className="stats">
            {param.stats.map((s, i) => (
              <li key={`static-${i}`}>
                {s.split('#').map((sv, j) => {
                  return (
                    <React.Fragment key={`fragment-${i}-${j}`}>
                      <span key={`span-${i}-${j}`}>{sv}</span>
                      {j < param.statValues[i].length && (
                        <input
                          className="values"
                          key={`input-${i}-${j}`}
                          type="tel"
                          value={param.statValues[i][j]}
                          onInput={(e) => handleStatChange(e, i, j)}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
