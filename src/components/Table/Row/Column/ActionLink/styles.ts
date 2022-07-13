import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { IActionLinkProps } from '.';

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

export const Container = styled(Link)<IActionLinkProps>`
  ${({ color }) => colorVariations[color || 'primary']};

  &:not(:last-child) {
    margin-right: 1.6rem;
  }
`;
