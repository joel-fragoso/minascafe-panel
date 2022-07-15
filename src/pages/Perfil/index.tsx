import { FC, useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import MainLayout from '../../layouts/MainLayout';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../hooks/auth';
import { useLoading } from '../../hooks/loading';
import { useToast } from '../../hooks/toast';
import { Errors } from '../../utils/getValidationErrors';
import { Container } from './styles';

interface IPerfilFormData {
  name: string;
}

const Perfil: FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();

  const { loading, setLoading } = useLoading();
  const { user, updateUser } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: IPerfilFormData) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await updateUser({ ...user, name: data.name });

        navigate('/dashboard');

        addToast({
          type: 'success',
          title: 'Perfil atualizado!',
          description:
            'Suas informações do perfil foram atualizadas com sucesso',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const validationErrors: Errors = {};

          err.inner.forEach(error => {
            validationErrors[error.path as string] = error.message;
          });

          formRef.current?.setErrors(validationErrors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description:
            'Ocorreu um erro ao atualizar o perfil, tente novamente.',
        });
      } finally {
        setLoading(false);
      }
    },
    [setLoading, updateUser, user, navigate, addToast],
  );

  return (
    <MainLayout>
      <Container>
        <Form
          ref={formRef}
          initialData={{ name: user.name, email: user.email }}
          onSubmit={handleSubmit}
          noValidate
        >
          <Input
            spellCheck={false}
            name="name"
            type="text"
            placeholder="Nome"
            iconName="user"
          />
          <Input
            spellCheck={false}
            name="email"
            type="email"
            placeholder="E-mail"
            iconName="envelope"
            disabled
          />
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

export default Perfil;
