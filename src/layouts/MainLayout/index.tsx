import { FC, ReactNode } from 'react';
import { Wrapper, Container, Content } from './styles';

interface IMainLayout {
  children: ReactNode;
}

const MainLayout: FC<IMainLayout> = ({ children }: IMainLayout) => {
  return (
    <Wrapper>
      <Container>
        <Content>{children}</Content>
      </Container>
    </Wrapper>
  );
};

export default MainLayout;
