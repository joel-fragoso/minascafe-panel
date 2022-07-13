import styled from 'styled-components';

export const Container = styled.tbody`
  font-size: 1.4rem;

  td {
    input {
      color: ${({ theme }) => theme.pallete.primary.main};
      width: 100%;
    }
  }
`;
