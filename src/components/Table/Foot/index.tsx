import { FC, TableHTMLAttributes } from 'react';
import { Container } from './styles';

const Foot: FC<TableHTMLAttributes<HTMLTableSectionElement>> = ({
  children,
}) => {
  return <Container>{children}</Container>;
};

export default Foot;
