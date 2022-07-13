import styled, { css } from 'styled-components';
import { IBadgeProps } from '.';

export const Container = styled.div<IBadgeProps>`
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
