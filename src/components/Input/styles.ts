import { darken, shade } from 'polished';
import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.label<ContainerProps>`
  background: ${({ theme }) => darken(0.025, theme.background.default)};
  border-radius: 0.8rem;
  border: 2px solid ${({ theme }) => darken(0.025, theme.background.default)};
  padding: 1.6rem;
  width: 100%;
  color: ${({ theme }) => theme.pallete.secondary?.main};
  display: flex;
  align-items: center;

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

  input {
    flex: 1;
    color: ${({ theme }) => theme.common.white};
    width: 100%;

    &::placeholder {
      color: ${({ theme }) => theme.pallete.secondary?.main};
    }

    &:disabled {
      cursor: not-allowed;
      color: ${({ theme }) =>
        shade(0.4, theme.pallete.secondary?.main as string)};
    }
  }

  > svg:first-child {
    margin-right: 1.6rem;
  }
`;

export const Error = styled(Tooltip)`
  height: 2rem;
  margin-left: 1.6rem;

  svg {
    color: ${({ theme }) => theme.pallete.danger?.main};
    margin: 0;
  }

  span {
    background-color: ${({ theme }) => theme.pallete.danger?.main};
    color: ${({ theme }) => theme.common.white};

    &::before {
      border-color: ${({ theme }) => theme.pallete.danger?.main} transparent;
    }
  }
`;
