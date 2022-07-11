import { transparentize } from 'polished';
import styled, { css } from 'styled-components';

interface IContainerProps {
  isOpen: boolean;
}

export const Container = styled.div<IContainerProps>`
  position: fixed;
  inset: 0;
  background-color: ${({ theme }) => transparentize(0.5, theme.common.black)};
  padding: 3rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  ${({ isOpen }) =>
    !isOpen &&
    css`
      visibility: hidden;
    `}
`;
