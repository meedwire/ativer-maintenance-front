import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string().required('O nome é requerido !!'),
  userName: Yup.string().required('O nome de usuário é requerido !!'),
  password: Yup.string().required('A senha é obrigátoria !!'),
});
