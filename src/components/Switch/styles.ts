import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  color: ${({ theme }) => theme.pallete.secondary?.main};
  display: flex;

  input {
    display: none;

    &:checked + label {
      background-color: ${({ theme }) => theme.pallete.success?.main};
    }

    &:checked + label::before {
      right: 0.2rem;
    }
  }

  label {
    width: 4.2rem;
    height: 2.8rem;
    display: flex;
    background-color: ${({ theme }) => theme.pallete.danger?.main};
    border-radius: 0.8rem;
    position: relative;
    padding: 0.2rem;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;

    &::before {
      content: '';
      width: 2.4rem;
      height: 2.4rem;
      position: absolute;
      background-color: ${({ theme }) => theme.background.default};
      border-radius: 0.8rem;
    }
  }

  &:not(:last-child) {
    margin-bottom: 0.8rem;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: ${({ theme }) => theme.pallete.danger?.main};
    `}

  ${props =>
    props.isFocused &&
    css`
      color: ${({ theme }) => theme.pallete.primary.main};
      border-color: ${({ theme }) => theme.pallete.primary.main};
    `}

  ${props =>
    props.isFilled &&
    css`
      color: ${({ theme }) => theme.pallete.primary.main};
    `}
`;

interface IGroupProps {
  label?: string;
}

export const Group = styled.div<IGroupProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  > span {
    ${({ label }) =>
      label &&
      css`
        margin-right: 0.8rem;
      `}
  }
`;

export const Error = styled(Tooltip)`
  height: 2rem;
  margin-left: 1.6rem;

  svg {
    color: ${({ theme }) => theme.pallete.danger?.main};
    margin: 0;
  }

  span {
    background-color: ${({ theme }) => theme.pallete.danger?.main};
    color: ${({ theme }) => theme.common.white};

    &::before {
      border-color: ${({ theme }) => theme.pallete.danger?.main} transparent;
    }
  }
`;
