import { FC, ReactNode } from 'react';
import { Container } from './styles';

interface TooltipProps {
  children: ReactNode;
  title: string;
  className?: string;
}

const Tooltip: FC<TooltipProps> = ({ children, className, title }) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;
