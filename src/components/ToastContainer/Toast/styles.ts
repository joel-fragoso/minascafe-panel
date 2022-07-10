import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

const toastTypeVariations = {
  info: css`
    background-color: ${({ theme }) => theme.pallete.danger?.main};
    color: ${({ theme }) => theme.pallete.danger?.contrastText};
  `,
  success: css`
    background-color: ${({ theme }) => theme.pallete.danger?.main};
    color: ${({ theme }) => theme.pallete.danger?.contrastText};
  `,
  error: css`
    background-color: ${({ theme }) => theme.pallete.danger?.main};
    color: ${({ theme }) => theme.pallete.danger?.contrastText};
  `,
};

interface IContainerProps {
  type?: 'info' | 'success' | 'error';
  hasdescription: number;
}

export const Container = styled(animated.div)<IContainerProps>`
  width: 36rem;
  position: relative;
  padding: 1.6rem 3rem 1.6rem 1.6rem;
  border-radius: 1rem;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;

  & + div {
    margin-top: 0.8rem;
  }

  ${({ type }) => toastTypeVariations[type || 'info']}

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

  button {
    position: absolute;
    top: 1.9rem;
    right: 1.6rem;
    opacity: 0.6;
    border: 0;
    background: transparent;
    color: inherit;
  }

  ${({ hasdescription }) =>
    !hasdescription &&
    css`
      align-self: auto;
      > svg {
        margin-top: 0;
      }
    `}
`;
