import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  padding: 1.6rem;
  flex: 1;
  color: ${({ theme }) => theme.pallete.primary.main};

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
      margin: 0;
    }

    > a {
      color: ${({ theme }) => theme.background.default};
      background-color: ${({ theme }) => theme.pallete.primary.main};
      border-radius: 0.8rem;
      height: 4.2rem;
      padding: 0 1.6rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      transition: background-color 0.3s linear;

      &:hover {
        background-color: ${({ theme }) =>
          shade(0.2, theme.pallete.primary.main as string)};
      }

      svg {
        padding-right: 0.8rem;
      }
    }
  }

  thead:not(:first-of-type) {
    td > div {
      margin: auto;
    }
  }
`;
