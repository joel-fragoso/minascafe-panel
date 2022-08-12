import styled from 'styled-components';

export const Container = styled.div`
  padding: 1.6rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > div {
    display: flex;
    flex-direction: row;

    > div {
      width: 100%;
    }
  }
`;
