import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import api from '../../services/api';
import { useLoading } from '../../hooks/loading';
import { useToast } from '../../hooks/toast';
import { Errors } from '../../utils/getValidationErrors';
import MainLayout from '../../layouts/MainLayout';
import { ICategoryProps } from '../Category';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Switch from '../../components/Switch';
import { Container } from './styles';

interface IProductFormData {
  categoryId: string;
  name: string;
  price: string;
  active: boolean;
}

const FormProduct: FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [categories, setCategories] = useState<ICategoryProps[]>([]);
  const [product, setProduct] = useState<ICategoryProps[]>([]);
  const { loading, setLoading } = useLoading();
  const navigate = useNavigate();

  const { id } = useParams();
  const { addToast } = useToast();

  useEffect(() => {
    async function getCategories() {
      try {
        setLoading(true);

        const response = await api.get('/categorias');

        setCategories(response.data.data);
      } catch {
        addToast({
          type: 'error',
          title: 'Erro ao buscar categorias',
          description: `Ocorreu um erro ao tentar buscar as categorias, tente novamente`,
        });
      } finally {
        setLoading(false);
      }
    }

    async function getProduct() {
      await getCategories();
      try {
        setLoading(true);

        const response = await api.get(`/produtos/${id}`);

        formRef.current?.setData({
          ...response.data.data,
          categoryId: response.data.data.category.id,
        });

        setProduct(response.data.data);
      } catch {
        addToast({
          type: 'error',
          title: 'Erro ao buscar produto',
          description: `Ocorreu um erro ao tentar buscar a produto ${id}, tente novamente`,
        });
      } finally {
        setLoading(false);
      }
    }

    getCategories();

    if (id) {
      getProduct();
    }
  }, [addToast, id, setCategories, setLoading]);

  const handleSubmit = useCallback(
    async (data: IProductFormData) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          categoryId: Yup.string().required('Categoria obrigatório'),
          name: Yup.string().required('Nome obrigatório'),
          price: Yup.number()
            .typeError('Precisa ser um número')
            .required('Preço obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if (id) {
          await api.put(`/produtos/${id}`, {
            ...data,
            price: parseFloat(data.price),
            active: data.active ?? false,
          });
        } else {
          await api.post('/produtos', {
            ...data,
            price: parseFloat(data.price),
            active: data.active ?? false,
          });
        }

        navigate('/produtos');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const validationErrors: Errors = {};

          err.inner.forEach(error => {
            validationErrors[error.path as string] = error.message;
          });

          formRef.current?.setErrors(validationErrors);
        }
      } finally {
        setLoading(false);
      }
    },
    [setLoading, id, navigate],
  );

  return (
    <MainLayout>
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Select
            name="categoryId"
            options={
              categories &&
              product &&
              categories.map(category => ({
                label: category.name,
                value: category.id,
                iconName: category.icon,
              }))
            }
          />
          <Input name="name" type="text" placeholder="Nome" />
          <Input name="price" type="text" placeholder="Preço" />
          <Switch name="active" label="Ativo:" />
          <Button
            type="submit"
            isResponsive
            disabled={loading}
            loading={loading}
          >
            Salvar
          </Button>
        </Form>
      </Container>
    </MainLayout>
  );
};

export default FormProduct;
