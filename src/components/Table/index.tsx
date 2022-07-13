import { FC, TableHTMLAttributes } from 'react';
import { Container } from './styles';

const Table: FC<TableHTMLAttributes<HTMLTableElement>> = ({
  children,
  ...rest
}) => {
  return (
    <Container>
      <table {...rest}>{children}</table>
    </Container>
  );
};

export default Table;
