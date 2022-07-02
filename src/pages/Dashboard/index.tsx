import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import { Container } from './styles';

const Dashboard: FC = () => {
  return (
    <MainLayout>
      <Container>
        <Outlet />
      </Container>
    </MainLayout>
  );
};

export default Dashboard;
