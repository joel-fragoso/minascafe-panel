import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.aside`
  height: 100%;
  background-color: ${({ theme }) => theme.background.default};
  border-right: 1px solid
    ${({ theme }) => lighten(0.08, theme.background.default)};
`;
