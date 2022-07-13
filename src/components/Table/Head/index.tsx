import { FC, TableHTMLAttributes } from 'react';
import { Container } from './styles';

const Head: FC<TableHTMLAttributes<HTMLTableSectionElement>> = ({
  children,
}) => {
  return <Container>{children}</Container>;
};

export default Head;
