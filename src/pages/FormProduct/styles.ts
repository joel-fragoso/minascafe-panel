import styled from 'styled-components';

export const Container = styled.div`
  padding: 1.6rem;
  flex: 1;
  color: ${({ theme }) => theme.pallete.primary.main};

  form {
    display: flex;
    flex-direction: column;
    row-gap: 0.8rem;
  }
`;

export const LabelContainer = styled.div`
  display: flex;
  column-gap: 0.8rem;
  align-items: center;
`;
