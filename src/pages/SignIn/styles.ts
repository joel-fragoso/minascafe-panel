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
    width: 5.6rem;
    height: 5.6rem;
    border-radius: 0.8rem;
  }

  form {
    width: 100%;
    text-align: center;

    h1 {
      margin-bottom: 2.4rem;
    }

    a {
      color: ${({ theme }) => theme.common.white};
      display: block;
      margin-top: 2.4rem;
      transition: color 0.2s linear;

      &:hover {
        color: ${({ theme }) => shade(0.2, theme.common.white)};
      }
    }

    @media (min-width: 380px) {
      width: 28rem;
    }
  }
`;
