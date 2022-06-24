import { FC } from 'react';
import { Container } from './styles';

const SignIn: FC = () => {
  return (
    <Container>
      <div>
        <input type="text" placeholder="Usuário" />
        <input type="password" placeholder="Senha" />
        <button type="submit">Entrar</button>
      </div>
    </Container>
  );
};

export default SignIn;
