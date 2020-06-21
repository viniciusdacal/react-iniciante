import React from 'react';
import PromotionCard from '../Card/Card';
import './List.css';

const PromotionList = ({ loading, error, promotions }) => {
  console.log({ loading, error, promotions });
  if (error) {
    return <div>Algo de errado não está certo</div>;
  }
  if (loading || promotions === null) {
    return <div>Carregando...</div>;
  }

  if (promotions.length === 0) {
    return <div>Nenhum resultado encontrado</div>;
  }

  return (
    <div className="promotion-list">
      {promotions.map((promotion) => (
        <PromotionCard promotion={promotion} />
      ))}
    </div>
  );
}

export default PromotionList;
