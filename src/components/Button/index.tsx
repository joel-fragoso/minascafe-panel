import { ButtonHTMLAttributes, FC } from 'react';
import Loading from '../Loading';
import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: FC<ButtonProps> = ({ children, loading, ...rest }) => {
  return (
    <Container type="button" {...rest}>
      {loading ? <Loading /> : children}
    </Container>
  );
};

export default Button;
