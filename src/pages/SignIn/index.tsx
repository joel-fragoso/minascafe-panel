import { FC, useCallback, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useLoading } from '../../hooks/loading';
import Button from '../../components/Button';
import Input from '../../components/Input';
import LogoImg from '../../assets/img/perfil.png';
import { Container } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}
interface Errors {
  [key: string]: string;
}

const SignIn: FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();
  const { loading, handleLoading } = useLoading();

  useEffect(() => {
    handleLoading(false);
  }, [handleLoading]);

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        handleLoading(true);

        navigate('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const validationErrors: Errors = {};

          err.inner.forEach(error => {
            validationErrors[error.path as string] = error.message;
          });

          formRef.current?.setErrors(validationErrors);
        }
      }
    },
    [navigate, handleLoading],
  );

  return (
    <Container>
      <img src={LogoImg} alt="Minas Café" />
      <Form ref={formRef} onSubmit={handleSubmit} noValidate>
        <h1>Faça seu logon</h1>
        <Input
          spellCheck={false}
          name="email"
          type="email"
          placeholder="Usuário"
          iconName="user"
        />
        <Input
          name="password"
          type="password"
          placeholder="Senha"
          iconName="lock"
        />
        <Button type="submit" disabled={loading} loading={loading}>
          Entrar
        </Button>
        <Link to="/dashboard">Esqueci minha senha</Link>
      </Form>
    </Container>
  );
};

export default SignIn;
