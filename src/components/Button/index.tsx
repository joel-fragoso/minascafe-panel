import { ButtonHTMLAttributes, FC } from 'react';
import Loading from '../Loading';
import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  color?: 'primary' | 'secondary' | 'info' | 'success' | 'danger';
  size?: 'default' | 'small' | 'large';
};

const Button: FC<ButtonProps> = ({
  children,
  loading,
  color,
  size,
  ...rest
}) => {
  return (
    <Container type="button" color={color} size={size} {...rest}>
      {loading ? <Loading /> : children}
    </Container>
  );
};

export default Button;
