import styled, { css } from 'styled-components';
import { animated } from 'react-spring';
import { shade, transparentize } from 'polished';

interface IContainerProps {
  type?: 'info' | 'success' | 'error';
}

const modalTypeVariations = {
  info: css`
    color: ${({ theme }) => theme.pallete.info?.main};
  `,
  success: css`
    color: ${({ theme }) => theme.pallete.success?.main};
  `,
  error: css`
    color: ${({ theme }) => theme.pallete.danger?.main};
  `,
};

export const Container = styled(animated.div)`
  width: 42rem;
  position: relative;
  border-radius: 0.8rem;
  box-shadow: 2px 2px 8px
    ${({ theme }) => transparentize(0.8, theme.common.black)};
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.background.paper};

  > button {
    position: absolute;
    top: 0;
    right: 0;
    padding: 1.6rem;
    opacity: 0.6;
    border: 0;
    background: transparent;
    color: ${({ theme }) => theme.pallete.secondary?.main};
    transition: color 0.2s linear;

    &:hover {
      color: ${({ theme }) =>
        shade(0.2, theme.pallete.secondary?.main as string)};
    }
  }
`;

export const Body = styled.div<IContainerProps>`
  display: flex;
  padding: 1.6rem;

  > svg {
    margin: 0.4rem 1.2rem 0 0;
    ${({ type }) => modalTypeVariations[type || 'info']};
  }

  div {
    flex: 1;

    strong {
      ${({ type }) => modalTypeVariations[type || 'info']};
    }

    p {
      margin-top: 0.8rem;
      font-size: 1.4rem;
      color: ${({ theme }) => theme.pallete.secondary?.main};
      opacity: 0.8;
      line-height: 2rem;
    }
  }
`;

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  padding: 1.6rem;
  border-top: 1px solid ${({ theme }) => theme.background.default};
  gap: 0.8rem;
`;
