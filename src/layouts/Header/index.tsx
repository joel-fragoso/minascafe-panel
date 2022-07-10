import { FC } from 'react';
import { useAuth } from '../../hooks/auth';
import { Container } from './styles';
import Icon from '../../components/Icon';

const Header: FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <a href="/">Logo</a>
      <button type="button" onClick={signOut}>
        <Icon iconName="sign-out" />
        Sair
      </button>
    </Container>
  );
};

export default Header;
