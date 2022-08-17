import styled, { css } from 'styled-components';

interface IContainerProps {
  active?: boolean;
  expanded?: boolean;
}

export const Container = styled.li<IContainerProps>`
  display: flex;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 0.4rem;
  }

  > a {
    flex: 1;
    padding: 1.2rem 1.6rem;
    font-family: 'Nunito', sans-serif;
    font-size: 1.4rem;
    color: ${({ theme }) => theme.pallete.primary.main};
    border-radius: 0.8rem;
    transition: background-color 0.3s linear;
    position: relative;
    line-height: 2.4rem;

    span {
      position: absolute;
      margin-left: 0.8rem;
      padding: 1.2rem 1.6rem;
      border-radius: 0.8rem;
      top: 0;
      visibility: hidden;
      transition: background-color 0.3s linear;

      ${({ expanded }) =>
        expanded &&
        css`
          position: relative;
          visibility: visible;
          padding: 0;
        `}
    }

    &:hover {
      background-color: ${({ theme }) => theme.background.paper};

      span {
        z-index: 999;
        visibility: visible;
        background-color: ${({ theme }) => theme.background.paper};
      }
    }

    ${({ active }) =>
      active &&
      css`
        background-color: ${({ theme }) => theme.background.paper};
      `}
  }
`;
