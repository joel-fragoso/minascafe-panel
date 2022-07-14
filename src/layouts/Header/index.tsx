import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { Container } from './styles';
import Icon from '../../components/Icon';

const Header: FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <Link to="/">Minas Café</Link>
      <button type="button" onClick={signOut}>
        <Icon iconName="sign-out" />
        Sair
      </button>
    </Container>
  );
};

export default Header;
