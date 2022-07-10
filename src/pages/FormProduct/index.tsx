import { FC, useCallback, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../../hooks/loading';
import MainLayout from '../../layouts/MainLayout';
import api from '../../services/api';
import { ICategoryProps } from '../Category';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Checkbox from '../../components/Checkbox';
import { Container } from './styles';

interface Errors {
  [key: string]: string;
}

interface IProductFormData {
  categoryId: string;
  name: string;
  price: string;
  active: boolean;
}

const FormProduct: FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [categories, setCategories] = useState<ICategoryProps[]>([]);
  const { loading, handleLoading } = useLoading();
  const navigate = useNavigate();

  useEffect(() => {
    async function getCategories() {
      const response = await api.get('/categorias');

      setCategories(response.data.data);
      handleLoading(false);
    }

    getCategories();
  }, [setCategories, handleLoading]);

  const handleSubmit = useCallback(
    async (data: IProductFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          categoryId: Yup.string().required('Categoria obrigatório'),
          name: Yup.string().required('Nome obrigatório'),
          price: Yup.string().required('Preço obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/produtos', {
          ...data,
          price: parseFloat(data.price),
          active: data.active ?? false,
        });

        handleLoading(true);

        navigate('/produtos');
      } catch (err) {
        handleLoading(false);

        if (err instanceof Yup.ValidationError) {
          const validationErrors: Errors = {};

          err.inner.forEach(error => {
            validationErrors[error.path as string] = error.message;
          });

          formRef.current?.setErrors(validationErrors);
        }
      }
    },
    [handleLoading, navigate],
  );

  return (
    <MainLayout>
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Select
            name="categoryId"
            options={
              categories &&
              categories.map(category => ({
                label: category.name,
                value: category.id,
                iconName: category.icon,
              }))
            }
          />
          <Input name="name" type="text" placeholder="Nome" />
          <Input name="price" type="text" placeholder="Preço" />
          <Checkbox name="active" label="Ativo:" defaultChecked />
          <Button type="submit" disabled={loading} loading={loading}>
            Salvar
          </Button>
        </Form>
      </Container>
    </MainLayout>
  );
};

export default FormProduct;