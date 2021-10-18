import * as Yup from 'yup';

export default Yup.object().shape({
  cnpj: Yup.string().required('O CNPJ é obrigatório !!'),
  comercialName: Yup.string().required('O nome domercial é obrigatório !!'),
  contact: Yup.string(),
  phone: Yup.string().required('Ao menos um contato é necessário !!'),
  address: Yup.object().shape({
    street: Yup.string().required('A rua é obrigatória !!'),
    postcode: Yup.string().required('O cep é obrigatório !!'),
    state: Yup.string().required('O estado é obrigatória !!'),
    city: Yup.string().required('A cidade é obrigatória !!'),
    number: Yup.number().typeError('O tipo deve ser um numero, caso não tenha digite 0.').required('O número é obrigatório !!'),
  }),
  ete: Yup.object().shape({
    model: Yup.string().required('O modelo é obrigatório !!'),
    manufacturer: Yup.string().required('O fabricante é obrigatório !!'),
  }),
});
