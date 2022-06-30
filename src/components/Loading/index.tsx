import { FC } from 'react';
import { Bounce, Container } from './styles';

const Loading: FC = () => {
  return (
    <Container>
      <Bounce />
      <Bounce delay />
    </Container>
  );
};

export default Loading;
