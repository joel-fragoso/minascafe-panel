import { FC, useCallback, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useLoading } from '../../hooks/loading';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import { Errors } from '../../utils/getValidationErrors';
import LogoImg from '../../assets/img/perfil.png';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Container } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();

  const { loading, setLoading } = useLoading();
  const { signIn } = useAuth();
  const { addToast } = useToast();

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        setLoading(true);

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

        await signIn({
          email: data.email,
          password: data.password,
        });

        navigate('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const validationErrors: Errors = {};

          err.inner.forEach(error => {
            validationErrors[error.path as string] = error.message;
          });

          formRef.current?.setErrors(validationErrors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais',
        });
      } finally {
        setLoading(false);
      }
    },
    [setLoading, signIn, navigate, addToast],
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
        <Button type="submit" isResponsive disabled={loading} loading={loading}>
          Entrar
        </Button>
        <Link to="/senha/esqueci">Esqueci minha senha</Link>
      </Form>
    </Container>
  );
};

export default SignIn;
