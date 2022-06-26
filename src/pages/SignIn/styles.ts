import { lighten } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 1.6rem;

  div {
    width: 100%;

    @media (min-width: 380px) {
      width: 28rem;
    }
  }

  button {
    padding: 0.8rem 1.6rem;
    font-size: 1.6rem;
    font-weight: 700;
    color: ${({ theme }) => theme.background.default};
    background-color: ${({ theme }) => theme.pallete.primary.main};
    display: flex;
    border-radius: 0.4rem;
    width: 100%;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s linear;

    &:hover {
      background-color: ${({ theme }) => theme.pallete.primary.dark};
    }

    &:active {
      background-color: ${({ theme }) =>
        lighten(0.1, theme.pallete.primary.dark as string)};
    }
  }
`;
