import * as Yup from 'yup';

export default Yup.object().shape({
  referenceName: Yup.string().required('O nome de referencia é obrigatório'),
  client: Yup.string().required('Selecione um cliente !!'),
  maintenances: Yup.array().of(
    Yup.object().shape({
      description: Yup.string().required('A descrição é obrigatória !!'),
      state: Yup.number()
    }).required('on')
  ).required('Este campo é obrigatório !!'),
});
