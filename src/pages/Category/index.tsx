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
import { useCategories } from '../../hooks/categories';
import MainLayout from '../../layouts/MainLayout';
import { dateToString } from '../../utils';
import { Container } from './styles';

const Category: FC = () => {
  const { user, signOut } = useAuth();

  const { categories, getCategories, deleteCategory } = useCategories();

  useEffect(() => {
    if (!user) {
      signOut();
    }

    getCategories();
  }, [getCategories, signOut, user]);

  return (
    <MainLayout>
      <Container>
        <div>
          <h1>Categorias</h1>
          <Link to="adicionar">
            <Icon iconName="plus" />
            Adicionar
          </Link>
        </div>
        <Table>
          <Head>
            <Row>
              <Column>Ícone</Column>
              <Column>Nome</Column>
              <Column>Ativo</Column>
              <Column>Data de criação</Column>
              <Column>Data de atualização</Column>
              <Column>Ações</Column>
            </Row>
          </Head>
          <Body>
            {categories &&
              categories.map(category => (
                <Row key={category.id}>
                  <Column>
                    <Icon iconName={category.icon} />
                  </Column>
                  <Column>{category.name}</Column>
                  <Column>
                    {category.active ? (
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
                  <Column>{dateToString(category.createdAt.date)}</Column>
                  <Column>
                    {category.updatedAt?.date
                      ? dateToString(category.updatedAt.date)
                      : 'N/D'}
                  </Column>
                  <Column>
                    <ActionLink to={`/categorias/editar/${category.id}`}>
                      <Icon iconName="pencil" />
                    </ActionLink>
                    <ActionButton
                      type="button"
                      color="danger"
                      onClick={() => deleteCategory(category.id)}
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

export default Category;
