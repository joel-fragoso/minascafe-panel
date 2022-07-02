import { FC } from 'react';
import { Container } from './styles';

const Product: FC = () => {
  return (
    <Container>
      <caption>Configurar Produtos</caption>
      <thead>
        <tr>
          <th>Produtos</th>
          <th>Opção</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Produtos 1</td>
          <td>Opçao</td>
        </tr>
        <tr>
          <td>Produtos 2</td>
          <td>Opçao</td>
        </tr>
        <tr>
          <td>Produtos 2</td>
          <td>Opçao</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={2}>Dados Atualizados</td>
        </tr>
      </tfoot>
    </Container>
  );
};

export default Product;
