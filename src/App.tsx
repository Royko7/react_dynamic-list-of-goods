import React, { useEffect, useState } from 'react';
import './App.scss';
import { GoodsList } from './GoodsList';

import { getAll, get5First, getRedGoods } from './api/goods';
import { Good } from './types/Good';

export const App: React.FC = () => {
  const [goodList, setGoodlist] = useState<Good[]>([]);
  const [mode, setMode] = useState('');

  useEffect(() => {
    switch (mode) {
      case 'All':
        getAll().then(goods => setGoodlist(goods));
        break;
      case '5First':
        get5First().then(goods => setGoodlist(goods));
        break;
      case 'RedGoods':
        getRedGoods().then(goods => setGoodlist(goods));
        break;

      default:
        return;
    }
  }, [mode]);

  return (
    <div className="App">
      <h1>Dynamic list of Goods</h1>

      <button type="button" data-cy="all-button" onClick={() => setMode('All')}>
        Load all goods
      </button>

      <button
        type="button"
        data-cy="first-five-button"
        onClick={() => setMode('5First')}
      >
        Load 5 first goods
      </button>

      <button
        type="button"
        data-cy="red-button"
        onClick={() => setMode('RedGoods')}
      >
        Load red goods
      </button>

      <GoodsList goods={goodList} />
    </div>
  );
};
