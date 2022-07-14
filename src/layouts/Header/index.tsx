import { FC, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import Icon from '../../components/Icon';
import perfilImg from '../../assets/img/perfil.jpg';
import { Container, Dropdown, Perfil } from './styles';

const Header: FC = () => {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState<boolean>(false);

  const handleOpened = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <Container>
      <Link to="/">Minas Café</Link>
      <Perfil onClick={handleOpened}>
        <img
          src={user.avatar ? user.avatarUrl : perfilImg}
          alt={user.avatar ? user.name : 'Foto do perfil'}
        />
        {user.name}
        <Icon iconName="angle-down" size="sm" />
        <Dropdown open={open}>
          <Link to="/usuario/perfil">Perfil</Link>
          <button type="button" onClick={signOut}>
            <Icon iconName="sign-out" />
            Sair
          </button>
        </Dropdown>
      </Perfil>
    </Container>
  );
};

export default Header;
