import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import MainLayout from '../../layouts/MainLayout';
import { ICategoryProps, IDate, KeyOfId } from '../Category';
import { Container } from './styles';

interface IProductProps {
  category: ICategoryProps;
  id: KeyOfId;
  name: string;
  price: number;
  active: boolean;
  createdAt?: IDate;
  updatedAt?: IDate;
}

const Product: FC = () => {
  const [products, setProducts] = useState<IProductProps[]>([]);
  const [categories, setCategories] = useState<ICategoryProps[]>([]);
  const [iconName, setIconName] = useState<IconName | undefined>(undefined);
  const categoryRef = useRef<HTMLSelectElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const priceRef = useRef<HTMLInputElement | null>(null);
  const activeRef = useRef<HTMLInputElement | null>(null);
  const [modify, setModify] = useState<string>('');

  const getProducts = useCallback(async () => {
    const response = await api.get('/produtos');

    setProducts(response.data.data);
  }, []);

  const getCategories = useCallback(async () => {
    const response = await api.get('/categorias');

    setCategories(response.data.data);
  }, []);

  const modifyProduct = useCallback(
    async (id: KeyOfId, action: string) => {
      if (action === 'start') {
        setModify(id);
      }

      if (action === 'apply') {
        const categoryId = categoryRef[id]?.value;
        const name = nameRef[id]?.value;
        const price = parseFloat(priceRef[id]?.value as string);
        const active = activeRef[id]?.checked;

        if (name) {
          const formData = {
            categoryId,
            name,
            price,
            active,
          };

          await api.put(`/produtos/${id}`, formData);
          await getProducts();
        }

        setModify('');
      }
    },
    [getProducts],
  );

  const deleteProduct = useCallback(
    async (id: string) => {
      // eslint-disable-next-line no-restricted-globals
      if (confirm('Você tem certeza que quer excluir?')) {
        await api.delete(`/produtos/${id}`);

        getProducts();
      }
    },
    [getProducts],
  );

  useEffect(() => {
    getProducts();
    getCategories();
  }, [getCategories, getProducts]);

  return (
    <MainLayout>
      <Container>
        <div>
          <Link to="adicionar">
            <FontAwesomeIcon icon={{ prefix: 'fas', iconName: 'plus' }} />
            Adicionar
          </Link>
        </div>
        <table>
          <caption>Configurar Produtos</caption>
          <thead>
            <tr>
              <th>Categoria</th>
              <th>Produtos</th>
              <th>Preço</th>
              <th>Ativo</th>
              <th>Data Criação</th>
              <th>Data Atualizado</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product: IProductProps) => (
                <tr key={product.id}>
                  {product.id === modify ? (
                    <>
                      <td>
                        <FontAwesomeIcon
                          icon={{
                            prefix: 'fas',
                            iconName: iconName || product.category.icon,
                          }}
                        />
                        <select
                          ref={e => {
                            categoryRef[product.id] = e;
                          }}
                          onChange={e =>
                            setIconName(
                              categories.find(
                                category => category.id === e.target.value,
                              )?.icon,
                            )
                          }
                          defaultValue={product.category.id}
                        >
                          {categories &&
                            categories.map(category => (
                              <option
                                key={category.id}
                                value={category.id}
                                label={category.name}
                              />
                            ))}
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          ref={e => {
                            nameRef[product.id] = e;
                          }}
                          defaultValue={product.name}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          ref={e => {
                            priceRef[product.id] = e;
                          }}
                          defaultValue={product.price}
                        />
                      </td>
                      <td>
                        <input
                          ref={e => {
                            activeRef[product.id] = e;
                          }}
                          type="checkbox"
                          defaultChecked={product.active}
                        />
                      </td>

                      <td>
                        {product.createdAt?.date &&
                          new Date(product.createdAt.date).toLocaleString()}
                      </td>
                      <td>
                        {product.updatedAt?.date &&
                          new Date(product.updatedAt.date).toLocaleString()}
                      </td>
                    </>
                  ) : (
                    <>
                      <td>
                        <FontAwesomeIcon
                          icon={{
                            prefix: 'fas',
                            iconName: product.category.icon,
                          }}
                        />
                        {product.category.name}
                      </td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>
                        <input
                          type="checkbox"
                          disabled
                          defaultChecked={product.active}
                        />
                      </td>
                      <td>
                        {product.createdAt?.date &&
                          new Date(product.createdAt.date).toLocaleString()}
                      </td>
                      <td>
                        {product.updatedAt?.date &&
                          new Date(product.updatedAt.date).toLocaleString()}
                      </td>
                    </>
                  )}
                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        modify === product.id
                          ? modifyProduct(product.id, 'apply')
                          : modifyProduct(product.id, 'start');
                      }}
                    >
                      <FontAwesomeIcon
                        icon={{ prefix: 'fas', iconName: 'pen-to-square' }}
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteProduct(product.id)}
                    >
                      <FontAwesomeIcon
                        icon={{ prefix: 'fas', iconName: 'trash-can' }}
                      />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Container>
    </MainLayout>
  );
};

export default Product;
