import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FC, useCallback, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import Breadcrumb from '../../components/Breadcrumb';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Switch from '../../components/Switch';
import { useCategories } from '../../hooks/categories';
import { useLoading } from '../../hooks/loading';
import { useProducts } from '../../hooks/products';
import MainLayout from '../../layouts/MainLayout';
import { Errors } from '../../utils/getValidationErrors';
import { Container } from './styles';

export interface IProductFormData {
  categoryId: string;
  name: string;
  price: string;
  active: boolean;
}

const FormProduct: FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { loading, setLoading } = useLoading();
  const navigate = useNavigate();

  const { id } = useParams();

  const { categories, getCategories } = useCategories();
  const { product, getProduct, updateProduct, createProduct } = useProducts();

  useEffect(() => {
    setLoading(true);

    getCategories();

    if (id) {
      getProduct(id);
    } else {
      setLoading(false);
    }
  }, [getCategories, getProduct, id, setLoading]);

  useEffect(() => {
    if (id === product?.id) {
      formRef.current?.setData({
        ...product,
        categoryId: product?.category?.id,
      });

      setLoading(false);
    }
  }, [id, product, setLoading]);

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
          updateProduct(id, data);
        } else {
          createProduct(data);
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
    [setLoading, id, navigate, updateProduct, createProduct],
  );

  return (
    <MainLayout>
      <Container>
        <Breadcrumb maxDepth={3} />
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
