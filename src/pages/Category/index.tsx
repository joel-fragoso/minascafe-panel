import { FC } from 'react';
import { Container } from './styles';

const Category: FC = () => {
  return (
    <Container>
      <caption>Configurar Categorias</caption>
      <thead>
        <tr>
          <th>Categorias</th>
          <th>Opção</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Categoria 1</td>
          <td>Opçao</td>
        </tr>
        <tr>
          <td>Categoria 2</td>
          <td>Opçao</td>
        </tr>
        <tr>
          <td>Categoria 2</td>
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

export default Category;
