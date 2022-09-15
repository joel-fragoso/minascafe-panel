import styled from 'styled-components';
import Input from '../../components/Input';

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

export const PriceContainer = styled.div`
  position: relative;
`;

export const PriceTag = styled.span`
  position: absolute;
  top: 1.6rem;
  left: 1.6rem;
  color: ${({ theme }) => theme.pallete.secondary?.main};
  pointer-events: none;
`;

export const PriceInput = styled(Input)`
  text-align: right;
`;
