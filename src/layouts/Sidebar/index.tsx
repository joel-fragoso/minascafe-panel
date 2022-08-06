import { FC } from 'react';
import { useSidebar } from '../../hooks/sidebar';
import Menu from '../Menu';
import { Container } from './styles';

const Sidebar: FC = () => {
  const { expanded } = useSidebar();

  return (
    <Container expanded={expanded}>
      <Menu expanded={expanded} />
    </Container>
  );
};

export default Sidebar;
