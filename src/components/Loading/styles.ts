import styled, { css } from 'styled-components';

interface IBounceProps {
  delay?: boolean;
}

export const Container = styled.div`
  width: 2rem;
  height: 2rem;
  position: relative;
  transition: all 0.2s ease-in-out;
`;

export const Bounce = styled.div<IBounceProps>`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.background.default};
  opacity: 0.5;
  position: absolute;
  top: 0;
  left: 0;
  animation: sk-bounce 2s infinite ease-in-out;
  z-index: 20;

  ${({ delay }) =>
    delay &&
    css`
      animation-delay: -1s;
    `}

  @keyframes sk-bounce {
    0%,
    100% {
      transform: scale(0);
    }
    50% {
      transform: scale(1);
    }
  }
`;
