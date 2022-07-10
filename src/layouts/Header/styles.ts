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

  a,
  button {
    color: ${({ theme }) => theme.common.white};
  }

  a {
    font-weight: 700;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    font-weight: 700;

    svg {
      margin-right: 0.8rem;
    }
  }
`;
