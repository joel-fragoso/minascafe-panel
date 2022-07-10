import styled from 'styled-components';

export const Container = styled.div`
  padding: 1.6rem;
  flex: 1;
  color: ${({ theme }) => theme.pallete.primary.main};

  div {
    display: flex;

    a {
      color: ${({ theme }) => theme.background.default};
      background-color: ${({ theme }) => theme.pallete.primary.main};
      border-radius: 0.8rem;
      padding: 0.8rem 1.2rem;
      font-weight: 700;
      margin-left: auto;

      svg {
        padding-right: 1rem;
      }
    }
  }

  table {
    width: 100%;
    border-spacing: 2px 0px;
    display: table;

    td,
    th {
      padding: 0.8rem 1.6rem;
      border: 3px solid ${({ theme }) => theme.common.black};
    }

    thead {
      th {
        padding: 1rem 1rem;
        font-size: 1.2rem;
        font-weight: 700;
      }
    }

    tbody {
      td {
        font-size: 1.2rem;

        input,
        select {
          color: ${({ theme }) => theme.pallete.primary.main};
          width: 100%;
        }
      }

      td:first-child {
        font-size: 2.4rem;
        text-align: center;

        input,
        select {
          margin-left: 2rem;
        }
      }

      td:last-child {
        font-size: 1.6rem;
        text-align: center;

        button:first-child {
          margin-right: 2rem;
          color: limegreen;
        }

        button:last-child {
          color: ${({ theme }) => theme.pallete.danger?.main};
        }
      }
    }
  }
`;
