import { FC, TableHTMLAttributes } from 'react';
import { Container } from './styles';

const Body: FC<TableHTMLAttributes<HTMLTableSectionElement>> = ({
  children,
}) => {
  return <Container>{children}</Container>;
};

export default Body;
