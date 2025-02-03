import React, { useEffect, useState } from 'react';
import { get, post } from '../api';

const getTags = async () => {
  const tags = await get('/api/tag/list');

  return tags;
};

const getItems = async () => {
  const items = await get('/api/item/list');

  if (items?.message) {
    console.log(items?.message);
    return [];
  }

  return items;
};

const options = [
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

const addTag = async (name: string) => {
  await post('/api/tag/add', { name });
};

const createItem = async (tagNames: Array<string>, cb: () => void) => {
  await post('/api/item/create', tagNames);

  cb?.();
};

type Tag = {
  id?: number;
  name: string;
};

type Item = {
  id?: number;
  tags: Array<Tag>;
};

export const Test = () => {
  const [tagName, setTagName] = useState('');
  const [tagNames, setTagNames] = useState<Array<string>>([]);
  const [items, setItems] = useState<Array<Item>>([]);

  const update = (e: React.FormEvent<HTMLInputElement>) => {
    setTagName(e.currentTarget.value);
  };

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTagNames([...e.target.selectedOptions].map((o) => o.value));
  };

  const getItemsList = () => {
    getItems().then((data) => {
      setItems(data);
    });
  };

  useEffect(() => {
    console.log('test');
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
        <select multiple onChange={onChange}>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <div>선택된 이름 {tagNames.join(', ')}</div>
        <button onClick={async () => createItem(tagNames, getItemsList)}>
          아이템 추가
        </button>
        <button onClick={getItemsList}>아이템 리스트</button>
        <ul>
          {items.map((i) => (
            <li key={i.id}>
              <ol>
                {i.tags.map((t) => (
                  <li key={t.id}>{t.name}</li>
                ))}
              </ol>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
