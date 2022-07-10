import { FC, useCallback, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useNavigate } from 'react-router-dom';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useLoading } from '../../hooks/loading';
import MainLayout from '../../layouts/MainLayout';
import { Container } from './styles';
import api from '../../services/api';

interface IDate {
  date: string;
  timezoneType: string;
  timezone: string;
}

interface ICategoryProps {
  id: string;
  name: string;
  icon: IconName;
  active: boolean;
  createdAt?: IDate;
  updatedAt?: IDate;
}

interface Errors {
  [key: string]: string;
}
interface IProductFormData {
  categoryId: string;
  name: string;
  price: number;
  active: boolean;
}

const FormProduct: FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [categories, setCategories] = useState<ICategoryProps[]>([]);
  const [iconName, setIconName] = useState<IconName | undefined>(undefined);
  const { loading, handleLoading } = useLoading();
  const navigate = useNavigate();

  const getCategories = useCallback(async () => {
    const response = await api.get('/categorias');

    setCategories(response.data.data);
  }, []);

  useEffect(() => {
    handleLoading(false);
    getCategories();
  }, [getCategories, handleLoading]);

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
          {(iconName ||
            categories.find(category => category !== undefined)?.icon) && (
            <FontAwesomeIcon
              icon={{
                prefix: 'fas',
                iconName:
                  iconName ||
                  (categories.find(category => category !== undefined)
                    ?.icon as IconName),
              }}
            />
          )}
          <select
            name="categoryId"
            onChange={e =>
              setIconName(
                categories.find(category => category.id === e.target.value)
                  ?.icon,
              )
            }
          >
            {categories &&
              categories.map(category => (
                <option
                  key={category.id}
                  value={category.id}
                  label={category.name}
                />
              ))}
          </select>
          <Input name="name" type="text" placeholder="Nome" />
          <Input name="price" type="text" placeholder="Preço" />
          <label htmlFor="active">
            Ativo:
            <input id="active" name="active" type="checkbox" defaultChecked />
          </label>
          <Button type="submit" disabled={loading} loading={loading}>
            Salvar
          </Button>
        </Form>
      </Container>
    </MainLayout>
  );
};

export default FormProduct;
