import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FC, useCallback, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import Breadcrumb from '../../components/Breadcrumb';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Switch from '../../components/Switch';
import { useCategories } from '../../hooks/categories';
import { useLoading } from '../../hooks/loading';
import { useProducts } from '../../hooks/products';
import MainLayout from '../../layouts/MainLayout';
import { Errors } from '../../utils/getValidationErrors';
import {
  Container,
  LabelContainer,
  PriceContainer,
  PriceInput,
  PriceTag,
} from './styles';

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

  const { categories, getFilteredCategories } = useCategories();
  const { product, getProduct, updateProduct, createProduct } = useProducts();

  useEffect(() => {
    setLoading(true);

    getFilteredCategories({ active: 1 });

    if (id) {
      getProduct(id);
    } else {
      setLoading(false);
    }
  }, [getFilteredCategories, getProduct, id, setLoading]);

  useEffect(() => {
    if (id === product?.id) {
      formRef.current?.setData({
        ...product,
        categoryId: product?.category?.id,
      });

      setLoading(false);
    }

    if (!id) {
      formRef.current?.setData({ active: true });
    }
  }, [id, product, setLoading]);

  const handleSubmit = useCallback(
    async (data: IProductFormData) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          categoryId: Yup.string().required('Categoria obrigatório'),
          name: Yup.string()
            .max(45, 'Limite de caracteres é 45')
            .required('Nome obrigatório'),
          price: Yup.number()
            .test('fraction', 'Máximo 2 dígitos depois do ponto', value => {
              if (value) {
                if (value.toString().split('.')[1]) {
                  return value.toString().split('.')[1].length <= 2;
                }
              }
              return true;
            })
            .test('length', 'Máximo 8 digitos inteiros', value =>
              value ? value.toFixed(2).length <= 11 : true,
            )
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
                label: (
                  <LabelContainer>
                    <Icon fixedWidth iconName={category.icon} />
                    {category.name}
                  </LabelContainer>
                ),
                value: category.id,
                data: category.name,
              }))
            }
            isSearchable
            placeholder="Selecione uma categoria..."
            noOptionsMsg="Nenhuma categoria"
            loadingMsg="Carregando..."
            isLoading={loading}
          />
          <Input name="name" type="text" placeholder="Nome" />
          <PriceContainer>
            <PriceInput name="price" type="text" placeholder="0.00" />
            <PriceTag>R$</PriceTag>
          </PriceContainer>
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
