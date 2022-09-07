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
import { ICategory, useCategories } from '../../hooks/categories';
import { useLoading } from '../../hooks/loading';
import MainLayout from '../../layouts/MainLayout';
import { dateToString } from '../../utils';
import getArrayInPages from '../../utils/getArrayInPages';
import { Container } from './styles';

const Category: FC = () => {
  const { user, signOut } = useAuth();

  const { categories, getCategories, deleteCategory } = useCategories();
  const { loading, setLoading } = useLoading();

  const [tablePages, setTablePages] = useState<ICategory[][] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true);

    if (!user) {
      signOut();
    }

    async function getData() {
      await getCategories();

      setLoading(false);
    }

    getData();
  }, [getCategories, setLoading, signOut, user]);

  useEffect(() => {
    async function getPages() {
      setTablePages(() => getArrayInPages(categories) as ICategory[][]);
    }

    if (categories[0]) {
      getPages();
    }
  }, [categories, loading, setLoading]);

  useEffect(() => {
    if (tablePages && tablePages.length < currentPage) {
      setCurrentPage(1);
    }
  }, [currentPage, tablePages]);

  const filterCategories = (query: string) => {
    setTablePages(
      () =>
        getArrayInPages(
          categories.filter(category =>
            category.name.toLowerCase().includes(query.toLowerCase()),
          ),
        ) as ICategory[][],
    );
  };

  return (
    <MainLayout>
      <Container>
        <Breadcrumb />
        <div>
          <Search
            placeholder="Buscar categoria..."
            minLength={1}
            debounceTimeout={500}
            onChange={event => filterCategories(event.target.value)}
          />
        </div>
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
          {loading ? (
            <Head>
              <Row>
                <Column colSpan={6}>
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
                      page.map(category => (
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
                          <Column>
                            {dateToString(category.createdAt.date)}
                          </Column>
                          <Column>
                            {category.updatedAt?.date
                              ? dateToString(category.updatedAt.date)
                              : 'N/D'}
                          </Column>
                          <Column>
                            <ActionLink
                              to={`/categorias/editar/${category.id}`}
                            >
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

export default Category;
