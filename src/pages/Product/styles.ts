import styled from 'styled-components';

export const Container = styled.div`
  padding: 1.6rem;
  flex: 1;

  table {
    width: 100%;
    border-spacing: 0.2rem 0px;
  }

  td,
  th {
    padding: 0.8rem 1.6rem;
    border: 3px solid ${({ theme }) => theme.common.black};
  }

  tfoot {
    text-align: center;
  }
`;
