import { IconName } from '@fortawesome/fontawesome-svg-core';
import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import MenuItem from '../MenuItem';
import { Container } from './styles';

const menuItems = [
  {
    to: '/dashboard',
    iconName: 'dashboard',
    title: 'Dashboard',
  },
  {
    to: '/categorias',
    iconName: 'tags',
    title: 'Categorias',
  },
  {
    to: '/produtos',
    iconName: 'box',
    title: 'Produtos',
  },
];

interface IMenuProps {
  expanded?: boolean;
}

const Menu: FC<IMenuProps> = ({ expanded }: IMenuProps) => {
  const location = useLocation();

  return (
    <Container>
      <ul>
        {menuItems.map(menu => (
          <MenuItem
            expanded={expanded}
            key={menu.title}
            active={menu.to === `/${location.pathname.split('/')[1]}`}
            to={menu.to}
            iconName={menu.iconName as IconName}
          >
            {menu.title}
          </MenuItem>
        ))}
      </ul>
    </Container>
  );
};

export default Menu;
