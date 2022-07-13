import { FC } from 'react';
import { LinkProps } from 'react-router-dom';
import { Container } from './styles';

export interface IActionLinkProps extends LinkProps {
  color?: 'primary' | 'secondary' | 'info' | 'success' | 'danger';
}

const ActionLink: FC<IActionLinkProps> = ({ color, ...rest }) => {
  return <Container color={color} {...rest} />;
};

export default ActionLink;
