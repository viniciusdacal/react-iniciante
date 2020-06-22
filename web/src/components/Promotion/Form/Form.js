import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useApi from 'components/utils/useApi';
import './Form.css';

const initialValue = {
  title: '',
  url: '',
  imageUrl: '',
  price: 0,
}

const PromotionForm = ({ id }) => {
  const [values, setValues] = useState(id ? null: initialValue);
  const history = useHistory();
  const [load] = useApi({
    url: `/promotions/${id}`,
    method: 'get',
    onCompleted: (response) => {
      setValues(response.data);
    }
  });

  const [save, saveInfo] = useApi({
    url: id ? `/promotions/${id}` : '/promotions',
    method: id ? 'put' : 'post',
    onCompleted: (response) => {
      if (!response.error) {
        history.push('/');
      }
    }
  })

  useEffect(() => {
    if (id) {
      load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function onChange(ev) {
    const { name, value } = ev.target;

    setValues({ ...values, [name]: value });
  }

  function onSubmit(ev) {
    ev.preventDefault();

    save({
      data: values,
    });
  }

  return (
    <div>
      <h1>Promo Show</h1>
      <h2>Nova Promoção</h2>
      {!values
        ? (
          <div>Carregando...</div>
        ) : (
          <form onSubmit={onSubmit}>
            {saveInfo.loading && <span>Salvando dados...</span>}
            <div className="promotion-form__group">
              <label htmlFor="title">Título</label>
              <input id="title" name="title" type="text" onChange={onChange} value={values.title} />
            </div>
            <div className="promotion-form__group">
              <label htmlFor="url">Link</label>
              <input id="url" name="url" type="text" onChange={onChange} value={values.url} />
            </div>
            <div className="promotion-form__group">
              <label htmlFor="imageUrl">Imagem (URL)</label>
              <input id="imageUrl" name="imageUrl" type="text" onChange={onChange} value={values.imageUrl} />
            </div>
            <div className="promotion-form__group">
              <label htmlFor="price">Preço</label>
              <input id="price" name="price" type="number" onChange={onChange} value={values.price} />
            </div>
            <div>
              <button type="submit">Salvar</button>
            </div>
          </form>
        )}
    </div>
  )
};

export default PromotionForm;
