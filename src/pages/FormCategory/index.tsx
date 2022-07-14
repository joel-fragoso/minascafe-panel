import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { fas } from '@fortawesome/free-solid-svg-icons';
import api from '../../services/api';
import { useLoading } from '../../hooks/loading';
import { useToast } from '../../hooks/toast';
import isIconName from '../../utils/getIconsNames';
import { Errors } from '../../utils/getValidationErrors';
import MainLayout from '../../layouts/MainLayout';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Switch from '../../components/Switch';
import { Container } from './style';

interface ICategoryFormData {
  name: string;
  icon: string;
  active: boolean;
}

const FormCategory: FC = () => {
  const [iconName, setIconName] = useState<string | undefined>(undefined);
  const formRef = useRef<FormHandles>(null);
  const iconNameList = [...new Set(Object.values(fas))];

  const { addToast } = useToast();
  const { loading, setLoading } = useLoading();
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    async function getCategory() {
      try {
        setLoading(true);

        const response = await api.get(`/categorias/${id}`);

        formRef.current?.setData(response.data.data);
      } catch {
        addToast({
          type: 'error',
          title: 'Erro ao buscar categoria',
          description: `Ocorreu um erro ao tentar buscar a categoria ${id}, tente novamente`,
        });
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      getCategory();
    }
  }, [addToast, id, setLoading]);

  const handleSubmit = useCallback(
    async (data: ICategoryFormData) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          icon: Yup.string()
            .test('test-name', 'Ícone inválido', () => isIconName(data.icon))
            .required('Ícone obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if (id) {
          await api.put(`/categorias/${id}`, {
            ...data,
            active: data.active ?? false,
          });
        } else {
          await api.post('/categorias', {
            ...data,
            active: data.active ?? false,
          });
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
    [setLoading, id, navigate],
  );

  return (
    <MainLayout>
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          {}
          <Input
            name="icon"
            list="iconNames"
            placeholder="Nome ícone"
            onChange={e => setIconName(e.target.value)}
            iconName={isIconName(iconName) ? iconName : undefined}
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
