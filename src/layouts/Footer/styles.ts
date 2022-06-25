import styled from 'styled-components';

export const Container = styled.footer`
  padding-top: 2.4rem;
  padding-bottom: 2.4rem;
  text-align: center;
  border-top: 1px solid ${({ theme }) => theme.background.paper};
`;
