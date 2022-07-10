import { FC, useCallback, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useLoading } from '../../hooks/loading';
import isIconName from '../../utils/getIconsNames';
import Input from '../../components/Input';
import Button from '../../components/Button';
import MainLayout from '../../layouts/MainLayout';
import { Container } from './style';
import Checkbox from '../../components/Checkbox';

interface Errors {
  [key: string]: string;
}
interface ICategoryFormData {
  name: string;
  icon: string;
  active: boolean;
}

const FormCategory: FC = () => {
  const [iconName, setIconName] = useState<string | undefined>(undefined);
  const formRef = useRef<FormHandles>(null);
  const iconNameList = [...new Set(Object.values(fas))];
  const { loading, handleLoading } = useLoading();
  const navigate = useNavigate();

  useEffect(() => {
    handleLoading(false);
  }, [handleLoading]);

  const handleSubmit = useCallback(
    async (data: ICategoryFormData) => {
      try {
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

        await api.post('/categorias', {
          ...data,
          active: data.active ?? false,
        });

        handleLoading(true);

        navigate('/categorias');
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
          {isIconName(iconName) && (
            <FontAwesomeIcon icon={{ prefix: 'fas', iconName }} />
          )}
          <Input
            name="icon"
            list="iconNames"
            placeholder="Nome ícone"
            onChange={e => setIconName(e.target.value)}
          />
          <Input name="name" type="text" placeholder="Nome" />
          <Checkbox name="active" label="Ativo:" defaultChecked />
          <Button type="submit" disabled={loading} loading={loading}>
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
