import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 1.6rem;

  form {
    width: 100%;
    text-align: center;

    h1 {
      font-size: 2.1rem;
      font-weight: 700;
      color: ${({ theme }) => theme.pallete.primary.main};
      margin-bottom: 2.4rem;

      @media (min-width: 767px) {
        font-size: 2.4rem;
      }
    }

    a {
      color: ${({ theme }) => theme.pallete.secondary?.main as string};
      display: block;
      margin-top: 2.4rem;
      transition: color 0.2s linear;

      &:hover {
        color: ${({ theme }) =>
          shade(0.2, theme.pallete.secondary?.main as string)};
      }

      svg {
        margin-right: 0.8rem;
      }
    }

    @media (min-width: 380px) {
      width: 28rem;
    }
  }
`;
