import styled, { css } from 'styled-components';
import { lighten, shade } from 'polished';

interface IContainerProps {
  color?: 'primary' | 'secondary' | 'info' | 'success' | 'danger';
  size?: 'default' | 'small' | 'large';
  isResponsive?: boolean;
}

const colorVariations = {
  primary: css`
    color: ${({ theme }) => theme.background.default};
    background-color: ${({ theme }) => theme.pallete.primary.main};

    &:hover {
      background-color: ${({ theme }) =>
        shade(0.2, theme.pallete.primary.main)};
    }

    &:active {
      background-color: ${({ theme }) =>
        lighten(0.1, theme.pallete.primary.dark as string)};
    }

    &:focus {
      outline: 2px solid ${({ theme }) => theme.pallete.primary.main};
      outline-offset: 2px;
    }

    &:disabled {
      cursor: not-allowed;
      background-color: ${({ theme }) =>
        shade(0.4, theme.pallete.primary.main)};
    }
  `,
  secondary: css`
    color: ${({ theme }) => theme.background.default};
    background-color: ${({ theme }) => theme.pallete.secondary?.main};

    &:hover {
      background-color: ${({ theme }) =>
        shade(0.2, theme.pallete.secondary?.main as string)};
    }

    &:active {
      background-color: ${({ theme }) =>
        lighten(0.1, theme.pallete.secondary?.dark as string)};
    }

    &:focus {
      outline: 2px solid ${({ theme }) => theme.pallete.secondary?.main};
      outline-offset: 2px;
    }

    &:disabled {
      cursor: not-allowed;
      background-color: ${({ theme }) =>
        shade(0.4, theme.pallete.secondary?.main as string)};
    }
  `,
  info: css`
    color: ${({ theme }) => theme.background.default};
    background-color: ${({ theme }) => theme.pallete.info?.main};

    &:hover {
      background-color: ${({ theme }) =>
        shade(0.2, theme.pallete.info?.main as string)};
    }

    &:active {
      background-color: ${({ theme }) =>
        lighten(0.1, theme.pallete.info?.dark as string)};
    }

    &:focus {
      outline: 2px solid ${({ theme }) => theme.pallete.info?.main};
      outline-offset: 2px;
    }

    &:disabled {
      cursor: not-allowed;
      background-color: ${({ theme }) =>
        shade(0.4, theme.pallete.info?.main as string)};
    }
  `,
  success: css`
    color: ${({ theme }) => theme.background.default};
    background-color: ${({ theme }) => theme.pallete.success?.main};

    &:hover {
      background-color: ${({ theme }) =>
        shade(0.2, theme.pallete.success?.main as string)};
    }

    &:active {
      background-color: ${({ theme }) =>
        lighten(0.1, theme.pallete.success?.dark as string)};
    }

    &:focus {
      outline: 2px solid ${({ theme }) => theme.pallete.success?.main};
      outline-offset: 2px;
    }

    &:disabled {
      cursor: not-allowed;
      background-color: ${({ theme }) =>
        shade(0.4, theme.pallete.success?.main as string)};
    }
  `,
  danger: css`
    color: ${({ theme }) => theme.background.default};
    background-color: ${({ theme }) => theme.pallete.danger?.main};

    &:hover {
      background-color: ${({ theme }) =>
        shade(0.2, theme.pallete.danger?.main as string)};
    }

    &:active {
      background-color: ${({ theme }) =>
        lighten(0.1, theme.pallete.danger?.dark as string)};
    }

    &:focus {
      outline: 2px solid ${({ theme }) => theme.pallete.danger?.main};
      outline-offset: 2px;
    }

    &:disabled {
      cursor: not-allowed;
      background-color: ${({ theme }) =>
        shade(0.4, theme.pallete.danger?.main as string)};
    }
  `,
};

const sizeVariations = {
  default: css`
    height: 5.8rem;
    padding: 0 1.6rem;
  `,
  small: css`
    height: 4.2rem;
    padding: 0 0.8rem;
  `,
  large: css`
    height: 6.4rem;
    padding: 0 1.8rem;
  `,
};

export const Container = styled.button<IContainerProps>`
  font-size: 1.6rem;
  font-weight: 700;
  border-radius: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s linear;

  ${({ isResponsive }) =>
    isResponsive
      ? css`
          width: 100%;
        `
      : css`
          width: unset;
          align-self: flex-start;
        `}

  ${({ color }) => colorVariations[color || 'primary']};

  ${({ size }) => sizeVariations[size || 'default']};
`;
