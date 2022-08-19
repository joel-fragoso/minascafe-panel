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
    padding: 1.6rem;
    display: flex;
    align-items: center;
    font-family: 'Nunito', sans-serif;
    font-size: 1.4rem;
    color: ${({ theme }) => theme.pallete.primary.main};
    border-radius: 0.8rem;
    transition: background-color 0.3s linear;
    position: relative;

    > div {
      position: absolute;
      padding: 1.2rem;
      visibility: hidden;
      transition: background-color 0.3s linear;
      border-radius: 0.8rem;
      margin-left: 2.4rem;

      span {
        vertical-align: middle;
      }

      ${({ expanded }) =>
        expanded &&
        css`
          position: relative;
          visibility: visible;
          line-height: 1.2rem;
          padding: 0;
        `}
    }

    &:hover {
      background-color: ${({ theme }) => theme.background.paper};

      > div {
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
