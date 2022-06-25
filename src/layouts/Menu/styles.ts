import styled from 'styled-components';

export const Container = styled.nav`
  padding: 0 0.8rem;
  height: 100%;
  font: 1.4rem 'Nunito', sans-serif;

  a {
    padding: 0.8rem 1.6rem;
    display: block;
    color: ${({ theme }) => theme.pallete.primary.main};

    &:hover {
      background-color: ${({ theme }) => theme.background.paper};
    }
  }
`;
