import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Badge from '../../components/Badge';
import Icon from '../../components/Icon';
import Table from '../../components/Table';
import Body from '../../components/Table/Body';
import Head from '../../components/Table/Head';
import Row from '../../components/Table/Row';
import Column from '../../components/Table/Row/Column';
import ActionButton from '../../components/Table/Row/Column/ActionButton';
import ActionLink from '../../components/Table/Row/Column/ActionLink';
import { useAuth } from '../../hooks/auth';
import { IProduct, useProducts } from '../../hooks/products';
import MainLayout from '../../layouts/MainLayout';
import { dateToString, formatterCurrency } from '../../utils';
import { Container } from './styles';

const Product: FC = () => {
  const { getProducts, deleteProduct, products } = useProducts();

  const { user, signOut } = useAuth();

  useEffect(() => {
    if (!user) {
      signOut();
    }

    getProducts();
  }, [getProducts, signOut, user]);

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
              products.map((product: IProduct) => (
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
              ))}
          </Body>
        </Table>
      </Container>
    </MainLayout>
  );
};

export default Product;
