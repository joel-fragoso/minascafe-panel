import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { Container } from './styles';

const Menu: FC = () => {
  const { signOut } = useAuth();
  return (
    <Container>
      <ul>
        <li>
          <Link to="/dashboard">Ir para Home</Link>
        </li>
        <li>
          <Link to="/categorias">Ir para Categorais</Link>
        </li>
        <li>
          <Link to="/produtos">Ir para Produtos</Link>
        </li>
        <li>
          <a href="/">Menu Item</a>
        </li>
        <li>
          <button type="button" onClick={signOut}>
            Logout
          </button>
        </li>
      </ul>
    </Container>
  );
};

export default Menu;
