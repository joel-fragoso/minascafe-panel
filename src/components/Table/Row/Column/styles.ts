import styled from 'styled-components';
import { IColumnProps } from '.';

export const Container = styled.td<IColumnProps>`
  display: table-cell;
  text-align: center;
  padding: 1.6rem;
  font-size: 1.4rem;
  white-space: nowrap;

  &:first-child {
    border-bottom-left-radius: 0.8rem;
    border-top-left-radius: 0.8rem;
  }

  &:last-child {
    border-bottom-right-radius: 0.8rem;
    border-top-right-radius: 0.8rem;
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: center;

    > div {
      margin-right: 0.8rem;
    }
  }
`;
