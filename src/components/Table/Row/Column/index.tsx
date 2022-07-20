import { FC, TdHTMLAttributes } from 'react';
import { Container } from './styles';

export type IColumnProps = TdHTMLAttributes<HTMLTableCellElement>;

const Column: FC<IColumnProps> = ({ children, ...rest }) => {
  return <Container {...rest}>{children}</Container>;
};

export default Column;
