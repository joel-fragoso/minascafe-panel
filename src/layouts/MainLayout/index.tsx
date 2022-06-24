import { FC, ReactNode } from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import { Wrapper, Container, Content } from './styles';

interface IMainLayout {
  children: ReactNode;
}

const MainLayout: FC<IMainLayout> = ({ children }: IMainLayout) => {
  return (
    <Wrapper>
      <Header />
      <Container>
        <Sidebar />
        <Content>{children}</Content>
      </Container>
    </Wrapper>
  );
};

export default MainLayout;