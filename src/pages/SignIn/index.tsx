import { FC, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
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

  const handleSubmit = useCallback(
    (data: SignInFormData) => {
      formRef.current?.setErrors({});

      console.log(data);

      navigate('/dashboard');
    },
    [navigate],
  );

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Faça seu logon</h1>
        <Input
          name="username"
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
        <Button type="submit">Entrar</Button>
        <Link to="/dashboard">Esqueci minha senha</Link>
      </Form>
    </Container>
  );
};

export default SignIn;
