import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 1.6rem;

  img {
    width: 6.4rem;
    height: 6.4rem;
    border-radius: 0.8rem;
    margin-bottom: 2.4rem;

    @media (min-width: 767px) {
      width: 7.2rem;
      height: 7.2rem;
    }
  }

  form {
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    row-gap: 0.8rem;

    h1 {
      font-size: 2.1rem;
      font-weight: 700;
      color: ${({ theme }) => theme.pallete.primary.main};
      margin-bottom: 1.6rem;

      @media (min-width: 767px) {
        font-size: 2.4rem;
      }
    }

    a {
      color: ${({ theme }) => theme.pallete.secondary?.main as string};
      display: block;
      margin-top: 1.6rem;
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
