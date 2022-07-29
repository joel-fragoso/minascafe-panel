import { fas } from '@fortawesome/free-solid-svg-icons';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import Breadcrumb from '../../components/Breadcrumb';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Switch from '../../components/Switch';
import { useCategories } from '../../hooks/categories';
import { useLoading } from '../../hooks/loading';
import MainLayout from '../../layouts/MainLayout';
import isIconName from '../../utils/getIconsNames';
import { Errors } from '../../utils/getValidationErrors';
import { Container } from './style';

export interface ICategoryFormData {
  name: string;
  icon: string;
  active: boolean;
}

const FormCategory: FC = () => {
  const [iconName, setIconName] = useState<string | undefined>(undefined);
  const formRef = useRef<FormHandles>(null);
  const iconNameList = [...new Set(Object.values(fas))];

  const { id } = useParams();

  const { loading, setLoading } = useLoading();
  const { getCategory, updateCategory, createCategory, category } =
    useCategories();

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    if (id) {
      getCategory(id);
    } else {
      setLoading(false);
    }
  }, [getCategory, id, setLoading]);

  useEffect(() => {
    if (id === category.id) {
      formRef.current?.setData(category);

      setIconName(category.icon);

      setLoading(false);
    }
  }, [category, id, setLoading]);

  const handleSubmit = useCallback(
    async (data: ICategoryFormData) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string()
            .max(45, 'Limite de caracteres é 45')
            .required('Nome obrigatório'),
          icon: Yup.string()
            .test('test-name', 'Ícone inválido', () => isIconName(data.icon))
            .max(45, 'Limite de caracteres é 45')
            .required('Ícone obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if (id) {
          updateCategory(id, data);
        } else {
          createCategory(data);
        }

        navigate('/categorias');
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
    [setLoading, id, navigate, updateCategory, createCategory],
  );

  return (
    <MainLayout>
      <Container>
        <Breadcrumb maxDepth={3} />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="icon"
            list="iconNames"
            placeholder="Nome do ícone"
            onChange={e => setIconName(e.target.value)}
            iconName={
              isIconName(iconName) && category.icon ? iconName : undefined
            }
            iconAlign="right"
          />
          <Input name="name" type="text" placeholder="Nome" />
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
        <datalist id="iconNames">
          {iconNameList.map(fasIcon => (
            <option
              key={fasIcon.iconName}
              value={fasIcon.iconName}
              label={fasIcon.iconName}
            />
          ))}
        </datalist>
      </Container>
    </MainLayout>
  );
};

export default FormCategory;
