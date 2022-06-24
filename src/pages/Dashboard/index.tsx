import { FC } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { Container } from './styles';

const Dashboard: FC = () => {
  return (
    <MainLayout>
      <Container>
        <h1>Olá, Mundo!</h1>
      </Container>
    </MainLayout>
  );
};

export default Dashboard;
