import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import api from '../../services/api';
import { ICategoryProps, IDate, KeyOfId } from '../Category';
import { useModal } from '../../hooks/modal';
import { useToast } from '../../hooks/toast';
import { dateToString, formatterCurrency } from '../../utils';
import MainLayout from '../../layouts/MainLayout';
import Icon from '../../components/Icon';
import Table from '../../components/Table';
import Head from '../../components/Table/Head';
import Body from '../../components/Table/Body';
import Row from '../../components/Table/Row';
import Column from '../../components/Table/Row/Column';
import ActionLink from '../../components/Table/Row/Column/ActionLink';
import ActionButton from '../../components/Table/Row/Column/ActionButton';
import Badge from '../../components/Badge';
import { Container } from './styles';

interface IProductProps {
  category: ICategoryProps;
  id: KeyOfId;
  name: string;
  price: number;
  active: boolean;
  createdAt: IDate;
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
        <Table>
          <Head>
            <Row>
              <Column>Nome</Column>
              <Column>Categoria</Column>
              <Column>Preço</Column>
              <Column>Ativo</Column>
              <Column>Data de criação</Column>
              <Column>Data de atualização</Column>
              <Column>Ações</Column>
            </Row>
          </Head>
          <Body>
            {products &&
              products.map((product: IProductProps) => (
                <Row key={product.id}>
                  {product.id === modify ? (
                    <>
                      <Column>
                        <input
                          type="text"
                          ref={e => {
                            nameRef[product.id] = e;
                          }}
                          defaultValue={product.name}
                        />
                      </Column>
                      <Column>
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
                      </Column>
                      <Column>
                        <input
                          type="text"
                          ref={e => {
                            priceRef[product.id] = e;
                          }}
                          defaultValue={product.price}
                        />
                      </Column>
                      <Column>
                        <input
                          ref={e => {
                            activeRef[product.id] = e;
                          }}
                          type="checkbox"
                          defaultChecked={product.active}
                        />
                      </Column>
                    </>
                  ) : (
                    <>
                      <Column>{product.name}</Column>
                      <Column>{product.category.name}</Column>
                      <Column>{formatterCurrency(product.price)}</Column>
                      <Column>
                        {product.active ? (
                          <div>
                            <Badge active />
                            Sim
                          </div>
                        ) : (
                          <div>
                            <Badge />
                            Não
                          </div>
                        )}
                      </Column>
                    </>
                  )}
                  <Column>
                    {product.createdAt?.date &&
                      dateToString(product.createdAt.date)}
                  </Column>
                  <Column>
                    {product.updatedAt?.date
                      ? dateToString(product.updatedAt.date)
                      : 'N/D'}
                  </Column>
                  <Column>
                    <ActionLink
                      to="/"
                      onClick={() => {
                        modify === product.id
                          ? modifyProduct(product.id, 'apply')
                          : modifyProduct(product.id, 'start');
                      }}
                    >
                      <Icon iconName="pencil" />
                    </ActionLink>
                    <ActionButton
                      color="danger"
                      type="button"
                      onClick={() => deleteProduct(product.id)}
                    >
                      <Icon iconName="trash" />
                    </ActionButton>
                  </Column>
                </Row>
              ))}
          </Body>
        </Table>
      </Container>
    </MainLayout>
  );
};

export default Product;
