import styled, { css } from 'styled-components';
import { darken } from 'polished';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: ${({ theme }) => darken(0.025, theme.background.default)};
  border-radius: 0.8rem;
  border: 2px solid ${({ theme }) => darken(0.025, theme.background.default)};
  padding: 1.6rem;
  width: 100%;
  color: ${({ theme }) => theme.pallete.secondary?.main};
  display: flex;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 0.8rem;
  }

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

    &::placeholder {
      color: ${({ theme }) => theme.pallete.secondary?.main};
    }
  }

  svg {
    margin-right: 1.6rem;
  }
`;
