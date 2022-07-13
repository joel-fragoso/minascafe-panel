import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useModal } from '../../hooks/modal';
import MainLayout from '../../layouts/MainLayout';
import { ICategoryProps, IDate, KeyOfId } from '../Category';
import { Container } from './styles';
import { useToast } from '../../hooks/toast';
import Icon from '../../components/Icon';

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

  const { showModal, hideModal } = useModal();
  const { addToast } = useToast();

  const deleteIdRef = useRef<string>('');

  const getProducts = useCallback(async () => {
    try {
      const response = await api.get('/produtos');

      setProducts(response.data.data);
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro ao carregar',
        description: 'Ocorreu um erro ao tentar carregar os produtos',
      });
    }
  }, [addToast]);

  const getCategories = useCallback(async () => {
    try {
      const response = await api.get('/categorias');

      setCategories(response.data.data);
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro ao carregar',
        description: 'Ocorreu um erro ao tentar carregar as categorias',
      });
    }
  }, [addToast]);

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

  const deleteConfirmed = useCallback(async () => {
    try {
      await api.delete(`/produtos/${deleteIdRef.current}`);
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro ao excluir',
        description: 'Ocorreu um erro ao tentar excluir o registro',
      });
    }

    getProducts();
    hideModal();
  }, [addToast, getProducts, hideModal]);

  const deleteProduct = useCallback(
    (id: string) => {
      deleteIdRef.current = id;

      showModal({
        type: 'error',
        title: 'Excluir item',
        description: 'Você deseja excluir esse item?',
        onConfirmation: deleteConfirmed,
      });
    },
    [deleteConfirmed, showModal],
  );

  useEffect(() => {
    getProducts();
    getCategories();
  }, [getCategories, getProducts]);

  return (
    <MainLayout>
      <Container>
        <div>
          <h1>Produtos</h1>
          <Link to="adicionar">
            <Icon iconName="plus" />
            Adicionar
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>Produtos</th>
              <th>Categoria</th>
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
                        <input
                          type="text"
                          ref={e => {
                            nameRef[product.id] = e;
                          }}
                          defaultValue={product.name}
                        />
                      </td>
                      <td>
                        <Icon iconName={iconName || product.category.icon} />
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
                      <td>{product.name}</td>
                      <td>
                        <Icon iconName={product.category.icon} />
                        {product.category.name}
                      </td>
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
                      <Icon iconName="pencil" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteProduct(product.id)}
                    >
                      <Icon iconName="trash" />
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
