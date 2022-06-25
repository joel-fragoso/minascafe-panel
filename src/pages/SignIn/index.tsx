import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Container } from './styles';

const SignIn: FC = () => {
  return (
    <Container>
      <div>
        <input type="text" placeholder="Usuário" />
        <input type="password" placeholder="Senha" />
        <button type="submit">Entrar</button>
      </div>
      <Link to="/dashboard">Ir para o Dashboard</Link>
    </Container>
  );
};

export default SignIn;
