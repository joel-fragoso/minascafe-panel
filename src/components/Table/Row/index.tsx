import { FC, HTMLAttributes } from 'react';
import { Container } from './styles';

const Row: FC<HTMLAttributes<HTMLTableRowElement>> = ({
  children,
  ...rest
}) => {
  return <Container {...rest}>{children}</Container>;
};

export default Row;
