import styled from 'styled-components';
import { lighten, shade } from 'polished';

export const Container = styled.button`
  background-color: ${({ theme }) => theme.pallete.primary.main};
  height: 5.6rem;
  border-radius: 0.8rem;
  padding: 0 1.6rem;
  color: ${({ theme }) => theme.background.default};
  width: 100%;
  font-weight: 700;
  transition: background-color 0.2s linear;

  &:hover {
    background-color: ${({ theme }) => shade(0.2, theme.pallete.primary.main)};
  }

  &:active {
    background-color: ${({ theme }) =>
      lighten(0.1, theme.pallete.primary.dark as string)};
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${({ theme }) => shade(0.4, theme.pallete.primary.main)};
  }
`;
