import { FC, TableHTMLAttributes } from 'react';
import { Container } from './styles';

export type IColumnProps = TableHTMLAttributes<HTMLTableCellElement>;

const Column: FC<IColumnProps> = ({ children, ...rest }) => {
  return <Container {...rest}>{children}</Container>;
};

export default Column;
