import styled, { css } from 'styled-components';
import { animated } from 'react-spring';
import { lighten, shade, transparentize } from 'polished';

interface IContainerProps {
  type?: 'info' | 'success' | 'error' | 'danger';
}

const toastTypeVariations = {
  info: css`
    background-color: ${({ theme }) => theme.background.paper};
    color: ${({ theme }) => theme.common.white};
  `,
  success: css`
    background-color: ${({ theme }) => theme.background.paper};
    color: ${({ theme }) => theme.common.white};
  `,
  error: css`
    background-color: ${({ theme }) => theme.pallete.danger?.main};
    color: ${({ theme }) => theme.pallete.danger?.contrastText};
  `,
  danger: css`
    background-color: ${({ theme }) => theme.background.paper};
    color: ${({ theme }) => theme.pallete.danger?.main};

    footer {
      button:last-of-type {
        background-color: ${({ theme }) => theme.pallete.danger?.main};

        &:hover {
          background-color: ${({ theme }) =>
            shade(0.2, theme.pallete.danger?.main as string)};
        }

        &:active {
          background-color: ${({ theme }) =>
            lighten(0.1, theme.pallete.danger?.main as string)};
        }
      }
    }
  `,
};

export const Container = styled(animated.div)<IContainerProps>`
  width: 42rem;
  position: relative;
  border-radius: 0.8rem;
  box-shadow: 2px 2px 8px
    ${({ theme }) => transparentize(0.8, theme.common.black)};
  display: flex;
  flex-direction: column;

  ${({ type }) => toastTypeVariations[type || 'info']}

  > button {
    position: absolute;
    top: 0;
    right: 0;
    padding: 1.6rem;
    opacity: 0.6;
    border: 0;
    background: transparent;
    color: inherit;
  }
`;

export const Body = styled.div<IContainerProps>`
  display: flex;
  padding: 1.6rem;

  > svg {
    margin: 0.4rem 1.2rem 0 0;
  }

  div {
    flex: 1;

    p {
      margin-top: 0.4rem;
      font-size: 1.4rem;
      opacity: 0.8;
      line-height: 2rem;
    }
  }
`;

export const Footer = styled.footer<IContainerProps>`
  display: flex;
  align-items: center;
  padding: 1.6rem;
  border-top: 1px solid ${({ theme }) => theme.background.default};
  gap: 0.8rem;
`;
