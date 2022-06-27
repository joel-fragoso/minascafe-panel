import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 1.6rem;

  form {
    width: 100%;

    @media (min-width: 380px) {
      width: 28rem;
    }
  }
`;
