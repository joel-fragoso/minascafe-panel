import { ButtonHTMLAttributes, FC } from 'react';
import Loading from '../Loading';
import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  color?: 'primary' | 'secondary' | 'info' | 'success' | 'danger';
  size?: 'default' | 'small' | 'large';
  isResponsive?: boolean;
};

const Button: FC<ButtonProps> = ({
  children,
  loading,
  color,
  size,
  isResponsive,
  ...rest
}) => {
  return (
    <Container
      type="button"
      color={color}
      size={size}
      isResponsive={isResponsive}
      {...rest}
    >
      {loading ? <Loading /> : children}
    </Container>
  );
};

export default Button;
