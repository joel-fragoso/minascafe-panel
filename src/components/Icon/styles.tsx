import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Container = styled(FontAwesomeIcon)`
  &:not(:last-child) {
    margin-right: 0.8rem;
  }
`;
