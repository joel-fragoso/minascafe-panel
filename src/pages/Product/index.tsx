import { FC } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { Container } from './styles';

const Product: FC = () => {
  return (
    <MainLayout>
      <Container>
        <table>
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
        </table>
      </Container>
    </MainLayout>
  );
};

export default Product;
