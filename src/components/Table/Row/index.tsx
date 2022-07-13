import { FC, TableHTMLAttributes } from 'react';
import { Container } from './styles';

const Row: FC<TableHTMLAttributes<HTMLTableRowElement>> = ({
  children,
  ...rest
}) => {
  return <Container {...rest}>{children}</Container>;
};

export default Row;
