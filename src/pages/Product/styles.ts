import styled from 'styled-components';

export const Container = styled.div`
  padding: 1.6rem;
  flex: 1;
  color: ${({ theme }) => theme.pallete.primary.main};

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
      margin: 0;
    }

    a {
      color: ${({ theme }) => theme.background.default};
      background-color: ${({ theme }) => theme.pallete.primary.main};
      border-radius: 0.8rem;
      padding: 0.8rem 1.2rem;
      font-weight: 700;

      svg {
        padding-right: 1rem;
      }
    }
  }

  table {
    margin-top: 1.6rem;
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
        font-size: 1.4rem;

        input,
        select {
          color: ${({ theme }) => theme.pallete.primary.main};
          width: 100%;
        }
      }

      td:nth-child(2) {
        text-align: center;

        input,
        select {
          margin-left: 2rem;
        }
      }

      td:last-child {
        text-align: center;

        button:first-child {
          color: ${({ theme }) => theme.pallete.primary.main};
          margin-right: 2rem;
        }

        button:last-child {
          color: ${({ theme }) => theme.pallete.danger?.main};
        }
      }
    }
  }
`;
