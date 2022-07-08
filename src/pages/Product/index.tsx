import { FC, useCallback, useEffect, useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import api from '../../services/api';
import { Container } from './styles';

interface IProductProps {
  id: string;
  name: string;
  price: number;
  active: boolean;
  createAt: string;
  updateAt: string;
}

const Product: FC = () => {
  const [products, setProducts] = useState<IProductPros[]>([]);

  const getProducts = useCallback(async () => {
    const response = await api.get('/produtos');

    setProducts(response.data.data);
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

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
            {products &&
              products.map((product: IProductPros) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>Opção</td>
                </tr>
              ))}
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
