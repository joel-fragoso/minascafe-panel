import { FC, useEffect, useState } from 'react';
import Card from '../../components/Card';
import { useCard } from '../../hooks/card';
import { useCategories } from '../../hooks/categories';
import { useProducts } from '../../hooks/products';
import MainLayout from '../../layouts/MainLayout';
import { Container } from './styles';

const Dashboard: FC = () => {
  const { countCategories } = useCategories();
  const { countProducts } = useProducts();
  const { messages, createCard } = useCard();

  const [categoriesLength, setCategoriesLength] = useState<number>(0);
  const [productsLength, setProductsLength] = useState<number>(0);

  useEffect(() => {
    async function getData() {
      const categoryLength = await countCategories();
      const productLenght = await countProducts();

      setCategoriesLength(categoryLength);
      setProductsLength(productLenght);
    }

    getData();
  }, [countCategories, countProducts]);

  useEffect(() => {
    createCard({
      id: 'categorias-cadastradas',
      title: 'Categorias',
      titleIcon: 'tags',
      description: 'Quantidade de categorias cadastradas',
      value: categoriesLength.toString(),
    });

    createCard({
      id: 'produtos-cadastrados',
      title: 'Produtos',
      titleIcon: 'box',
      description: 'Quantidade de produtos cadastrados',
      value: productsLength.toString(),
    });
  }, [categoriesLength, createCard, productsLength]);

  return (
    <MainLayout>
      <Container>
        <div>
          {messages[0] && <Card message={messages[0]} />}
          {messages[1] && <Card message={messages[1]} />}
        </div>
      </Container>
    </MainLayout>
  );
};

export default Dashboard;
