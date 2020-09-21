import * as yup from 'yup';

export default yup.object().shape({
  title: yup.string().required('Campo obrigatório'),
  url: yup.string().url('URL deve ser válida').required('Campo obrigatório'),
  imageUrl: yup
    .string()
    .url('URL deve ser válida')
    .required('Campo obrigatório'),
  price: yup.number().required('Campo obrigatório'),
});
