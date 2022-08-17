import { IconName } from '@fortawesome/fontawesome-svg-core';
import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/Icon';
import { Container } from './styles';

interface IMenuItemProps {
  children: ReactNode;
  to: string;
  iconName?: IconName;
  active?: boolean;
  expanded?: boolean;
}

const MenuItem: FC<IMenuItemProps> = ({
  children,
  to,
  iconName,
  active,
  ...rest
}: IMenuItemProps) => {
  return (
    <Container active={active || false} {...rest}>
      <Link to={to}>
        {iconName && <Icon iconName={iconName} fixedWidth />}
        <span>{children}</span>
      </Link>
    </Container>
  );
};

export default MenuItem;
