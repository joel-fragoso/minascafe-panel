import { darken, lighten } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  div {
    width: 18rem;
  }

  input {
    padding: 0.8rem 1.6rem;
    background-color: ${({ theme }) => darken(0.025, theme.background.default)};
    margin-bottom: 0.8rem;
    border-radius: 0.4rem;
    width: 100%;
  }

  button {
    padding: 0.8rem 1.6rem;
    color: ${({ theme }) => darken(0.025, theme.background.default)};
    background-color: ${({ theme }) => theme.pallete.primary.main};
    display: flex;
    border-radius: 0.4rem;
    border: 0;
    width: 100%;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: ${({ theme }) => theme.pallete.primary.dark};
    }

    &:active {
      background-color: ${({ theme }) =>
        lighten(0.1, theme.pallete.primary.dark as string)};
    }
  }
`;
