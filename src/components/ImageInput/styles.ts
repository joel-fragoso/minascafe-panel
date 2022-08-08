import { darken, shade } from 'polished';
import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  color: ${({ theme }) => theme.pallete.secondary?.main};
  position: relative;
  line-height: 0;

  > img {
    height: 12.4rem;
    width: 12.4rem;
    border-radius: 0.8rem;
  }

  input {
    color: ${({ theme }) => theme.pallete.primary.main};
    background: ${({ theme }) => darken(0.025, theme.background.default)};
    border: 2px solid ${({ theme }) => darken(0.025, theme.background.default)};
    border-radius: 0.8rem;
    position: absolute;
    right: 0.3rem;
    bottom: 0.2rem;
    width: 3.6rem;
    height: 3.6rem;

    ${props =>
      props.isErrored &&
      css`
        border-color: ${({ theme }) => theme.pallete.danger?.main};
      `}

    ${props =>
      props.isFocused &&
      css`
        color: ${({ theme }) => theme.pallete.primary.main};
        border-color: ${({ theme }) => theme.pallete.primary.main};
      `}

    ${props =>
      props.isFilled &&
      css`
        color: ${({ theme }) => theme.pallete.primary.main};
      `}

    &:disabled {
      cursor: not-allowed;
      color: ${({ theme }) =>
        shade(0.4, theme.pallete.secondary?.main as string)};
    }
  }

  > svg {
    position: absolute;
    pointer-events: none;
    bottom: 1.25rem;

    ${props =>
      props.isErrored
        ? css`
            right: 0.5rem;
          `
        : css`
            right: 1.3rem;
          `}
  }

  > input::-webkit-file-upload-button {
    visibility: hidden;
  }

  > input::before {
    content: '';
    width: 3.6rem;
    height: 3.6rem;
    display: inline-block;
    background-color: ${({ theme }) => theme.background.default};
    border-radius: 0.8rem;
    cursor: pointer;
  }
`;

export const Error = styled(Tooltip)`
  position: absolute;
  bottom: 4rem;
  right: 0.4rem;

  > svg {
    color: ${({ theme }) => theme.pallete.danger?.main};
  }

  > span {
    line-height: 1.6rem;
    background-color: ${({ theme }) => theme.pallete.danger?.main};
    color: ${({ theme }) => theme.common.white};

    &::before {
      border-color: ${({ theme }) => theme.pallete.danger?.main} transparent;
      left: 60%;
    }
  }
`;
