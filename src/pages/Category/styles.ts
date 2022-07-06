import styled from 'styled-components';

export const Container = styled.div`
  padding: 1.6rem;
  flex: 1;
  color: ${({ theme }) => theme.pallete.primary.main};

  table {
    width: 100%;
    border-spacing: 2px 0px;

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

        input {
          display: block;
          margin: auto;
        }
      }

      td:first-child {
        font-size: 2.4rem;
        text-align: center;
      }

      td:last-child {
        font-size: 1.6rem;
        text-align: center;

        button:first-child {
          float: left;
          color: limegreen;
        }

        button:last-child {
          float: right;
          color: ${({ theme }) => theme.pallete.danger?.main};
        }
      }
    }

    tfoot {
      text-align: center;

      td {
        font-size: 1.6rem;
        font-weight: 700;
      }
    }
  }
`;
