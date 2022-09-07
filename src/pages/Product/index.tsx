import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Badge from '../../components/Badge';
import Breadcrumb from '../../components/Breadcrumb';
import Icon from '../../components/Icon';
import Loading from '../../components/Loading';
import Pagination from '../../components/Pagination';
import Search from '../../components/Search';
import Table from '../../components/Table';
import Body from '../../components/Table/Body';
import Foot from '../../components/Table/Foot';
import Head from '../../components/Table/Head';
import Row from '../../components/Table/Row';
import Column from '../../components/Table/Row/Column';
import ActionButton from '../../components/Table/Row/Column/ActionButton';
import ActionLink from '../../components/Table/Row/Column/ActionLink';
import { useAuth } from '../../hooks/auth';
import { useLoading } from '../../hooks/loading';
import { IProduct, useProducts } from '../../hooks/products';
import MainLayout from '../../layouts/MainLayout';
import { dateToString, formatterCurrency } from '../../utils';
import getArrayInPages from '../../utils/getArrayInPages';
import { Container } from './styles';

const Product: FC = () => {
  const { getProducts, deleteProduct, products } = useProducts();

  const { user, signOut } = useAuth();
  const { loading, setLoading } = useLoading();

  const [tablePages, setTablePages] = useState<IProduct[][] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true);

    if (!user) {
      signOut();
    }

    async function getData() {
      await getProducts();

      setLoading(false);
    }

    getData();
  }, [getProducts, setLoading, signOut, user]);

  useEffect(() => {
    async function getPages() {
      setTablePages(() => getArrayInPages(products) as IProduct[][]);
    }

    if (products[0]) {
      getPages();
    }
  }, [loading, products, setLoading]);

  useEffect(() => {
    if (tablePages && tablePages.length < currentPage) {
      setCurrentPage(1);
    }
  }, [currentPage, tablePages]);

  const filterProducts = (query: string) => {
    setTablePages(
      () =>
        getArrayInPages(
          products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase()),
          ),
        ) as IProduct[][],
    );
  };

  return (
    <MainLayout>
      <Container>
        <Breadcrumb />
        <div>
          <h1>Produtos</h1>
          <div>
            <Search
              placeholder="Buscar produto..."
              minLength={1}
              debounceTimeout={500}
              onChange={event => filterProducts(event.target.value)}
            />
            <Link to="adicionar">
              <Icon iconName="plus" />
              Adicionar
            </Link>
          </div>
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
          {loading ? (
            <Head>
              <Row>
                <Column colSpan={7}>
                  <Loading />
                </Column>
              </Row>
            </Head>
          ) : (
            <>
              <Body>
                {tablePages &&
                  tablePages.map(
                    (page, i) =>
                      currentPage === i + 1 &&
                      page.map(product => (
                        <Row key={product.id}>
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
                            <ActionLink to={`/produtos/editar/${product.id}`}>
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
                      )),
                  )}
              </Body>
              {tablePages && tablePages.length > 1 && (
                <Foot>
                  <Row>
                    <Column colSpan={6}>
                      <Pagination
                        currentPage={currentPage}
                        numberOfPages={tablePages.length}
                        setCurrentPage={setCurrentPage}
                      />
                    </Column>
                  </Row>
                </Foot>
              )}
            </>
          )}
        </Table>
      </Container>
    </MainLayout>
  );
};

export default Product;
