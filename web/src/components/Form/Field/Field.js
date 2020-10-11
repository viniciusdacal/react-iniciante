import React from 'react';
import { useField } from 'formik';
import './Field.css';

const FormField = ({ name, id, label, ...restProps }) => {
  const [field, meta] = useField({ name, id, ...restProps });

  return (
    <>
      {label && (
        <label htmlFor={id ?? name} className="form-field__label">
          {label}
        </label>
      )}
      <input
        {...field}
        name={name}
        id={id ?? name}
        className={`form-field__input ${
          meta.error && 'form-field__input--has-error'
        }`}
      />
      {meta.error && (
        <span className="form-field__error-message">{meta.error}</span>
      )}
    </>
  );
};

export default FormField;
