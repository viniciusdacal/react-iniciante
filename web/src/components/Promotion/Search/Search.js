import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useApi from 'components/utils/useApi';
import UIInfiniteScroll from 'components/UI/InfiniteScroll/InfiniteScroll';
import UIButton from 'components/UI/Button/Button';

import PromotionList from '../List/List';
import './Search.css';

const baseParams = {
  _embed: 'comments',
  _order: 'desc',
  _sort: 'id',
  _limit: 5,
};

const PromotionSearch = () => {
  const [page, setPage] = useState(1);
  const mountRef = useRef(null);
  const [search, setSearch] = useState('');
  const [load, loadInfo] = useApi({
    debounceDelay: 300,
    url: '/promotions',
    method: 'get',
  });

  useEffect(() => {
    load({
      debounced: mountRef.current,
      params: {
        ...baseParams,
        _page: 1,
        title_like: search || undefined,
      },
    });

    if (!mountRef.current) {
      mountRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  function fetchMore() {
    const newPage = page + 1;
    load({
      isFetchMore: true,
      params: {
        ...baseParams,
        _page: newPage,
        title_like: search || undefined,
      },
      updateRequestInfo: (newRequestInfo, prevRequestInfo) => ({
        ...newRequestInfo,
        data: [...prevRequestInfo.data, ...newRequestInfo.data],
      }),
    });
    setPage(newPage);
  }

  return (
    <div className="promotion-search">
      <header className="promotion-search__header">
        <h1>Promo Show</h1>
        <UIButton component={Link} to="/create" theme="contained-green">
          Nova Promoção
        </UIButton>
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
        refetch={() => {
          load({
            params: baseParams,
          });
        }}
      />
      {loadInfo.data &&
        !loadInfo.loading &&
        loadInfo.data?.length < loadInfo.total && (
          <UIInfiniteScroll fetchMore={fetchMore} />
        )}
    </div>
  );
};

export default PromotionSearch;
