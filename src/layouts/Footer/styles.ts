import styled from 'styled-components';

export const Container = styled.footer`
  padding-top: 1.6rem;
  padding-bottom: 1.6rem;
  text-align: center;
  border-top: 1px solid ${({ theme }) => theme.background.paper};
  font-size: 1.2rem;
  font-weight: 400;
  color: ${({ theme }) => theme.pallete.secondary?.main as string};
`;
