import { FC } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import { Container } from './styles';

const Dashboard: FC = () => {
  return (
    <MainLayout>
      <Container>
        <h1>Olá, Mundo!</h1>
        <Link to="/">Ir para o SignIn</Link>
      </Container>
    </MainLayout>
  );
};

export default Dashboard;
