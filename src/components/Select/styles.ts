import { darken, lighten, shade } from 'polished';
import { Theme } from 'react-functional-select';
import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isDisabled?: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  ${({ isDisabled }) =>
    isDisabled &&
    css`
      cursor: not-allowed;
    `}
`;

export const SelectTheme: Theme = {
  color: {
    border: css`
      ${({ theme }) => darken(0.025, theme.background.default)};
    `,
    danger: css`
      ${({ theme }) => theme.pallete.danger?.main};
    `,
    primary: css`
      ${({ theme }) => theme.pallete.primary.main};
    `,
    disabled: shade(0.4, darken(0.025, theme.background.default)),
    placeholder: css`
      ${({ theme }) => theme.pallete.secondary?.main};
    `,
    dangerLight: css`
      ${({ theme }) => theme.pallete.danger?.light};
    `,
  },
  input: {},
  select: {
    css: css`
      background-color: ${({ theme }) =>
        darken(0.025, theme.background.default)};
      border-radius: 0.8rem;

      > div {
        > div {
          &:nth-child(2) {
            > div:empty {
              background-color: ${({ theme }) => theme.background.paper};
              margin: 0.8rem 0;
            }
          }
        }
      }
    `,
  },
  loader: {
    size: '0.8rem',
    padding: '0.4rem 0.8rem',
    color: css`
      ${({ theme }) => theme.pallete.primary.main}
    `,
  },
  icon: {
    color: css`
      ${({ theme }) => theme.pallete.secondary?.main}
    `,
    hoverColor: css`
      ${({ theme }) => lighten(0.1, theme.pallete.secondary?.main as string)}
    `,
    padding: '0 1.2rem',
    clear: {
      width: '1.6rem',
      height: '1.6rem',
    },
    caret: {
      size: '0.8rem',
    },
  },
  control: {
    minHeight: '0',
    borderWidth: '2px',
    borderRadius: '0.8rem',
    boxShadow: '0',
    padding: '1.6rem',
    focusedBorderColor: css`
      ${({ theme }) => theme.pallete.primary.main}
    `,
  },
  menu: {
    margin: '0.4rem 0',
    borderRadius: '0.8rem',
    backgroundColor: css`
      ${({ theme }) => darken(0.025, theme.background.default)}
    `,
    option: {
      selectedColor: css`
        ${({ theme }) => theme.pallete.primary.contrastText}
      `,
      selectedBgColor: css`
        ${({ theme }) => theme.pallete.primary.main};

        &:first-child {
          border-top-left-radius: 0.8rem;
          border-top-right-radius: 0.8rem;
        }

        &:last-child {
          border-bottom-left-radius: 0.8rem;
          border-bottom-right-radius: 0.8rem;
        }
      `,
      padding: '0.6rem 1.6rem',
      focusedBgColor: css`
        ${({ theme }) => theme.background.paper};

        &:first-child {
          border-top-left-radius: 0.8rem;
          border-top-right-radius: 0.8rem;
        }

        &:last-child {
          border-bottom-left-radius: 0.8rem;
          border-bottom-right-radius: 0.8rem;
        }
      `,
    },
  },
  noOptions: {
    fontSize: '1.6rem',
    margin: '0.4rem 0',
    color: css`
      ${({ theme }) => theme.pallete.secondary?.main}
    `,
    padding: '1.6rem',
  },
  multiValue: {
    margin: '0 0.4rem',
    borderRadius: '0.4rem',
    backgroundColor: css`
      ${({ theme }) => theme.background.paper}
    `,
    label: {
      borderRadius: '0.4rem',
      fontSize: '1.6rem',
      padding: '0.4rem 0.8rem',
    },
    clear: {
      padding: '0.4rem 0.8rem',
      color: css`
        ${({ theme }) => theme.pallete.secondary?.main}
      `,
      fontSize: '1.2rem',
      focusColor: css`
        ${({ theme }) => lighten(0.1, theme.pallete.secondary?.main as string)}
      `,
    },
  },
};

interface IErrorProps {
  clearable: boolean;
}

export const Error = styled(Tooltip)<IErrorProps>`
  position: absolute;
  right: 12%;
  top: 31%;
  height: 2rem;

  svg {
    color: ${({ theme }) => theme.pallete.danger?.main};
  }

  span {
    background-color: ${({ theme }) => theme.pallete.danger?.main};
    color: ${({ theme }) => theme.common.white};

    &::before {
      border-color: ${({ theme }) => theme.pallete.danger?.main} transparent;
    }
  }

  ${({ clearable }) =>
    clearable &&
    css`
      right: 8%;
    `}
`;
