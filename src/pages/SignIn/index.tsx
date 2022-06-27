import { FC } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Container } from './styles';

const SignIn: FC = () => {
  return (
    <Container>
      <form>
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
      </form>
      <Link to="/dashboard">Ir para o Dashboard</Link>
    </Container>
  );
};

export default SignIn;
