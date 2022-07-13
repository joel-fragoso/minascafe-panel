import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.tr`
  background-color: ${({ theme }) => theme.background.paper};
  transition: background-color 0.2s linear;

  &:hover {
    background-color: ${({ theme }) =>
      shade(0.2, theme.background.paper as string)};
  }
`;
