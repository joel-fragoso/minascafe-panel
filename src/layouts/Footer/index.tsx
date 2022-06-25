import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container } from './styles';

const Footer: FC = () => {
  return (
    <Container>
      <span>
        © 2022 - Feito com{' '}
        <FontAwesomeIcon icon={{ prefix: 'fas', iconName: 'heart' }} /> por Joel
        Fragoso
      </span>
    </Container>
  );
};

export default Footer;
