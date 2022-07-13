import { shade } from 'polished';
import styled, { css } from 'styled-components';

export const Container = styled.div`
  padding: 1.6rem;
  flex: 1;
  color: ${({ theme }) => theme.pallete.primary.main};

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
      margin: 0;
    }

    > a {
      color: ${({ theme }) => theme.background.default};
      background-color: ${({ theme }) => theme.pallete.primary.main};
      border-radius: 0.8rem;
      height: 4.2rem;
      padding: 0 1.6rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      transition: background-color 0.3s linear;

      &:hover {
        background-color: ${({ theme }) =>
          shade(0.2, theme.pallete.primary.main as string)};
      }

      svg {
        padding-right: 1rem;
      }
    }
  }
`;

export const Table = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch !important;
  justify-content: center;
  margin-top: 1.6rem;
`;

export const Head = styled.div`
  padding: 1.6rem;
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.pallete.secondary?.main};
`;

export const Body = styled.div`
  font-size: 1.4rem;

  > div {
    flex: 1;
    padding: 1.6rem;
    border-radius: 0.8rem;
    background-color: ${({ theme }) => theme.background.paper};
    transition: background-color 0.2s linear;

    &:hover {
      background-color: ${({ theme }) =>
        shade(0.2, theme.background.paper as string)};
    }
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:not(:last-child) {
    margin-bottom: 0.8rem;
  }
`;

interface IColumnProps {
  size?: string;
}

export const Column = styled.div<IColumnProps>`
  text-align: center;

  ${({ size }) =>
    size
      ? css`
          width: ${size};
        `
      : css`
          width: 100%;
        `};

  input {
    color: ${({ theme }) => theme.pallete.primary.main};
    width: 100%;
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: center;

    > div {
      margin-right: 0.8rem;
    }
  }
`;

interface IActionProps {
  color?: 'primary' | 'secondary' | 'info' | 'success' | 'danger';
}

const colorVariations = {
  primary: css`
    color: ${({ theme }) => theme.pallete.primary.main};
  `,
  secondary: css`
    color: ${({ theme }) => theme.pallete.secondary?.main};
  `,
  info: css`
    color: ${({ theme }) => theme.pallete.info?.main};
  `,
  success: css`
    color: ${({ theme }) => theme.pallete.success?.main};
  `,
  danger: css`
    color: ${({ theme }) => theme.pallete.danger?.main};
  `,
};

export const Action = styled.button<IActionProps>`
  ${({ color }) => colorVariations[color || 'primary']};

  &:not(:last-child) {
    margin-right: 1.6rem;
  }
`;

interface IBadgeProps {
  active?: boolean;
}

export const Badge = styled.div<IBadgeProps>`
  width: 1rem;
  height: 1rem;
  border-radius: 0.5rem;

  ${({ active }) =>
    active
      ? css`
          background-color: ${({ theme }) => theme.pallete.success?.main};
        `
      : css`
          background-color: ${({ theme }) => theme.pallete.danger?.main};
        `};
`;
