import React, { useState, useEffect } from 'react';
import useApi from 'components/utils/useApi';
import { Link } from 'react-router-dom';

import PromotionList from '../List/List';
import './Search.css';

const PromotionSearch = () => {
  const [search, setSearch] = useState('');
  const [load, loadInfo] = useApi({
    url: '/promotions',
    method: 'get',
    params: {
      _embed: 'comments',
      _order: 'desc',
      _sort: 'id',
      title_like: search || undefined,
    },
  });

  useEffect(() => {
    load();
  }, [search]);

  return (
    <div className="promotion-search">
      <header className="promotion-search__header">
        <h1>Promo Show</h1>
        <Link to="/create">Nova Promoção</Link>
      </header>
      <input
        type="search"
        className="promotion-search__input"
        placeholder="Buscar"
        value={search}
        onChange={(ev) => setSearch(ev.target.value)}
      />
      <PromotionList
        promotions={loadInfo.data}
        loading={loadInfo.loading}
        error={loadInfo.error}
      />
    </div>
  );
};

export default PromotionSearch;
