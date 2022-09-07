import { darken, shade } from 'polished';
import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isHiding: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: ${({ theme }) => darken(0.025, theme.background.default)};
  border-radius: 0.8rem;
  border: 2px solid ${({ theme }) => darken(0.025, theme.background.default)};
  width: 100%;
  color: ${({ theme }) => theme.pallete.secondary?.main};
  display: flex;
  flex-direction: row;
  transition: all 0.8s ease-out;
  font-size: 1.2rem;

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
    padding: 1.6rem;
    flex: 1;
    color: ${({ theme }) => theme.common.white};
    width: 100%;
    overflow: hidden;
    transition: padding 0.8s ease-in-out;

    &::placeholder {
      color: ${({ theme }) => theme.pallete.secondary?.main};
    }

    &:disabled {
      cursor: not-allowed;
      color: ${({ theme }) =>
        shade(0.4, theme.pallete.secondary?.main as string)};
    }
  }

  button {
    position: relative;
    padding: 1.6rem;
    display: flex;
    align-items: center;
    background: ${({ theme }) => darken(0.025, theme.background.default)};
    border-radius: 0.8rem;
    transition: all 0.3s linear;
    font-size: 1.6rem;

    &:hover {
      background-color: ${({ theme }) => theme.background.paper};
    }
  }

  ${props =>
    !props.isHiding &&
    css`
      button::before {
        content: '';
        align-self: center;
        position: absolute;
        left: 0;
        z-index: 100;
        width: 1px;
        height: 2.8rem;
        background-color: ${({ theme }) => theme.background.paper};
      }
    `}

  ${props =>
    props.isHiding &&
    css`
      width: 0;
      border-color: transparent;
      background-color: unset;

      input {
        width: 0;
        padding: 1.6rem 0;
      }

      button {
        background-color: ${({ theme }) => theme.pallete.primary.main};

        &:hover {
          background-color: ${({ theme }) =>
            shade(0.2, theme.pallete.primary.main)};
        }
      }
    `}
`;
