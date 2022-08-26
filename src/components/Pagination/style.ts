import { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 0.8rem;
`;

interface IPageButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  disabledButton?: boolean;
  active?: boolean;
}

export const PageButton = styled.button<IPageButtonProps>`
  width: 3.2rem;
  height: 3.2rem;
  padding: 0.8rem;
  font-family: 'Nunito', sans-serif;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.pallete.primary.main};
  border-radius: 0.8rem;
  transition: background-color 0.3s linear;
  color: unset;

  &:hover {
    background-color: ${({ theme }) => theme.background.paper};
  }

  ${({ disabledButton }) =>
    disabledButton &&
    css`
      color: unset;
      cursor: not-allowed;
    `};

  ${({ active }) =>
    active &&
    css`
      background-color: ${({ theme }) => theme.background.paper};
      color: ${({ theme }) => theme.pallete.primary.main};
    `}
`;
