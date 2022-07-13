import { ButtonHTMLAttributes, FC } from 'react';
import { Container } from './styles';

export interface IActionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'secondary' | 'info' | 'success' | 'danger';
}

const ActionButton: FC<IActionProps> = ({ color, ...rest }: IActionProps) => {
  return <Container color={color} {...rest} />;
};

export default ActionButton;
