import styled from 'styled-components';

export const Container = styled.tfoot`
  padding: 1.6rem;
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.pallete.secondary?.main};

  tr {
    background-color: unset;

    &:hover {
      background-color: unset;
    }
  }
`;
