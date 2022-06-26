import { FC } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/Input';
import { Container } from './styles';

const SignIn: FC = () => {
  return (
    <Container>
      <div>
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
        <button type="submit">Entrar</button>
      </div>
      <Link to="/dashboard">Ir para o Dashboard</Link>
    </Container>
  );
};

export default SignIn;
