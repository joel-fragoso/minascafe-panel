import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.header`
  width: 100%;
  min-height: 4.8rem;
  padding: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.background.default};
  border-bottom: 1px solid
    ${({ theme }) => darken(0.05, theme.background.default)};
`;