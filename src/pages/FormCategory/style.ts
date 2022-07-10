import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  padding: 3rem;
  flex: 1;
  color: ${({ theme }) => theme.pallete.primary.main};

  form {
    display: flex;
    flex-direction: column;

    a {
      color: ${({ theme }) => theme.pallete.secondary?.main};
      display: block;
      margin-top: 2.4rem;
      transition: color 0.2s linear;

      &:hover {
        color: ${({ theme }) =>
          shade(0.2, theme.pallete.secondary?.main as string)};
      }
    }
  }
`;
