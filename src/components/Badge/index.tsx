import { FC } from 'react';
import { Container } from './styles';

export interface IBadgeProps {
  active?: boolean;
}

const Badge: FC<IBadgeProps> = ({ active }: IBadgeProps) => {
  return <Container active={active} />;
};

export default Badge;
