import { darken, lighten } from 'polished';
import styled, { css } from 'styled-components';

export const Container = styled.header`
  width: 100%;
  min-height: 4.8rem;
  padding: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.background.default};
  border-bottom: 1px solid
    ${({ theme }) => darken(0.05, theme.background.default)};

  > div {
    > button {
      padding: 0.8rem;
      margin-right: 2rem;
      color: ${({ theme }) => theme.common.white};

      &:hover {
        background-color: ${({ theme }) =>
          lighten(0.2, theme.background.default)};
      }
    }

    > a {
      font-weight: 700;
      color: ${({ theme }) => theme.common.white};
    }
  }
`;

export const Perfil = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  gap: 0.8rem;

  img {
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 1.2rem;
    flex-shrink: 0;
  }
`;
interface IDropdownProps {
  open: boolean;
}

export const Dropdown = styled.div<IDropdownProps>`
  width: 100%;
  position: absolute;
  top: 3.2rem;
  right: 0;
  border-radius: 0.8rem;
  background-color: ${({ theme }) =>
    lighten(0.2, theme.background.default as string)};
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
  font-size: 1.4rem;
  z-index: 100;

  ${({ open }) =>
    open
      ? css`
          display: flex;
        `
      : css`
          display: none;
        `}

  &::before {
    content: '';
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    border-style: solid;
    border-color: ${({ theme }) =>
        lighten(0.2, theme.background.default as string)}
      transparent;
    border-width: 0 6px 6px 6px;
  }

  > a,
  > button {
    color: ${({ theme }) => theme.common.white};
  }

  > button {
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      margin-right: 0.8rem;
    }
  }
`;
