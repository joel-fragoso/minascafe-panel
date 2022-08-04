import { FC, ReactNode } from 'react';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
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
        {iconName && <FontAwesomeIcon icon={{ prefix: 'fas', iconName }} />}
        <span>{children}</span>
      </Link>
    </Container>
  );
};

export default MenuItem;
