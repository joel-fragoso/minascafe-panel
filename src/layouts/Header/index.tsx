import { FC, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import perfilImg from '../../assets/img/perfil.jpg';
import Icon from '../../components/Icon';
import { useAuth } from '../../hooks/auth';
import { useSidebar } from '../../hooks/sidebar';
import { Container, Dropdown, Perfil } from './styles';

const Header: FC = () => {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState<boolean>(false);

  const { expanded, setExpanded } = useSidebar();

  const handleOpened = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <Container>
      <div>
        <button type="button" onClick={() => setExpanded(!expanded)}>
          <Icon fixedWidth iconName="bars" size="1x" />
        </button>
        <Link to="/">Minas Café</Link>
      </div>
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
