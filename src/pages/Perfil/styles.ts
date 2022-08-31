import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  padding: 1.6rem;
  color: ${({ theme }) => theme.pallete.primary.main};

  > form {
    display: inline-flex;
    width: 100%;

    > div {
      flex: 1;
      display: flex;
      flex-direction: column;
      row-gap: 0.8rem;
    }

    > div:first-child {
      flex-grow: 0;
      padding-right: 0.8rem;
    }
  }
`;
