import { FC } from 'react';
import { Container } from './styles';

const Menu: FC = () => {
  return (
    <Container>
      <ul>
        <li>
          <a href="/">Menu Item</a>
        </li>
        <li>
          <a href="/">Menu Item</a>
        </li>
      </ul>
    </Container>
  );
};

export default Menu;
