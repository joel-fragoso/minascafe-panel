import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CardContainer from '../../components/CardContainer';
import { useCard } from '../../hooks/card';
import { useCategories } from '../../hooks/categories';
import { useProducts } from '../../hooks/products';
import MainLayout from '../../layouts/MainLayout';
import { Container } from './styles';

const Dashboard: FC = () => {
  const { countCategories, countActiveCategories } = useCategories();
  const { countProducts, countActiveProducts } = useProducts();
  const { messages, createCard } = useCard();

  const [categoriesLength, setCategoriesLength] = useState<number>(0);
  const [categoriesActiveLength, setCategoriesActiveLength] =
    useState<number>(0);
  const [productsLength, setProductsLength] = useState<number>(0);
  const [productsActiveLength, setProductsActiveLength] = useState<number>(0);

  useEffect(() => {
    async function getData() {
      const categoryLength = await countCategories();
      const productLenght = await countProducts();
      const activeCategories = await countActiveCategories();
      const activeProducts = await countActiveProducts();

      setCategoriesLength(categoryLength);
      setProductsLength(productLenght);
      setCategoriesActiveLength(activeCategories);
      setProductsActiveLength(activeProducts);
    }

    getData();
  }, [
    countActiveCategories,
    countActiveProducts,
    countCategories,
    countProducts,
  ]);

  useEffect(() => {
    createCard({
      id: 'categorias-cadastradas',
      title: 'Categorias',
      titleIcon: 'archive',
      description: 'Quantidade de categorias cadastradas',
      value: categoriesLength.toString(),
    });

    createCard({
      id: 'produtos-cadastrados',
      title: 'produtos',
      titleIcon: 'briefcase',
      description: 'Quantidade de produtos cadastrados',
      value: productsLength.toString(),
    });

    createCard({
      id: 'categorias-ativas',
      title: 'Categorias',
      description: 'Quantidade de categorias ativas',
      value: categoriesActiveLength.toString(),
    });

    createCard({
      id: 'produtos-ativos',
      title: 'Produtos',
      description: 'Quantidade de produtos ativos',
      value: productsActiveLength.toString(),
    });
  }, [
    categoriesActiveLength,
    categoriesLength,
    createCard,
    productsActiveLength,
    productsLength,
  ]);

  return (
    <MainLayout>
      <Container>
        <div>
          <h1>Olá, Bem-vindo ao painel do Minas Café!</h1>
          <Link to="/">Ir para o SignIn</Link>
        </div>
        <CardContainer messages={messages} />
      </Container>
    </MainLayout>
  );
};

export default Dashboard;
