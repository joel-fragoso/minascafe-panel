import { lighten } from 'polished';
import styled, { css } from 'styled-components';

interface IContainerProps {
  expanded?: boolean;
}

export const Container = styled.aside<IContainerProps>`
  height: 100%;
  background-color: ${({ theme }) => theme.background.default};
  border-right: 1px solid
    ${({ theme }) => lighten(0.08, theme.background.default)};

  ${({ expanded }) =>
    expanded
      ? css`
          width: 28rem;
        `
      : css`
          width: auto;
        `}
`;
