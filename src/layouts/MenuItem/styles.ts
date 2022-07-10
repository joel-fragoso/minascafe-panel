import styled, { css } from 'styled-components';

interface IContainerProps {
  active?: boolean;
}

export const Container = styled.li<IContainerProps>`
  display: flex;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 0.4rem;
  }

  a {
    flex: 1;
    padding: 1.2rem 1.6rem;
    font-family: 'Nunito', sans-serif;
    font-size: 1.4rem;
    color: ${({ theme }) => theme.pallete.primary.main};
    border-radius: 0.8rem;
    transition: background-color 0.3s linear;

    &:hover {
      background-color: ${({ theme }) => theme.background.paper};
    }

    svg {
      margin-right: 0.8rem;
    }

    ${({ active }) =>
      active &&
      css`
        background-color: ${({ theme }) => theme.background.paper};
      `}
  }
`;
