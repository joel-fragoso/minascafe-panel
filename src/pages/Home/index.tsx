import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Container } from './styles';

const Home: FC = () => {
  return (
    <Container>
      <h1>Olá, Mundo!</h1>
      <Link to="/">Ir para o SignIn</Link>
    </Container>
  );
};

export default Home;
