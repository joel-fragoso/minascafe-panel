import { transparentize } from 'polished';
import styled, { css } from 'styled-components';

interface IContainerProps {
  hasdescription: number;
}

export const Container = styled.div<IContainerProps>`
  width: 32rem;
  height: 12rem;
  padding: 1.6rem;
  border-radius: 0.8rem;
  box-shadow: 2px 2px 8px
    ${({ theme }) => transparentize(0.8, theme.common.black)};
  background-color: ${({ theme }) => theme.background.paper};
  margin: 0.8rem;
  display: flex;

  & + div {
    margin-top: 0.8rem;
  }

  > svg {
    margin: 0.4rem 1.2rem 0 0;
  }

  div {
    flex: 1;
    align-self: center;

    p {
      margin-top: 0.4rem;
      font-size: 1.4rem;
      opacity: 0.8;
      line-height: 2rem;
    }
  }

  div:last-child {
    text-align: right;
    align-self: center;
    font-size: 5.2rem;
    font-weight: 700;
  }

  ${({ hasdescription }) =>
    !hasdescription &&
    css`
      align-self: auto;
      > svg {
        margin-top: 0;
      }
    `}
`;
