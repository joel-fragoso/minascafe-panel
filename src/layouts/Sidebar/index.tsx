import { FC } from 'react';
import Menu from '../Menu';
import { Container } from './styles';

const Sidebar: FC = () => {
  return (
    <Container>
      <Menu />
    </Container>
  );
};

export default Sidebar;
