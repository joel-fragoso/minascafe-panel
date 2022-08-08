import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FC, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Breadcrumb from '../../components/Breadcrumb';
import Button from '../../components/Button';
import ImageInput from '../../components/ImageInput';
import Input from '../../components/Input';
import { useAuth } from '../../hooks/auth';
import { useAvatar } from '../../hooks/avatar';
import { useLoading } from '../../hooks/loading';
import { useToast } from '../../hooks/toast';
import MainLayout from '../../layouts/MainLayout';
import { Errors } from '../../utils/getValidationErrors';
import { Container } from './styles';

interface IPerfilFormData {
  name: string;
  avatar?: string;
}

const Perfil: FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();

  const { loading, setLoading } = useLoading();
  const { user, updateUser } = useAuth();
  const { addToast } = useToast();
  const { updateAvatar } = useAvatar();

  const handleSubmit = useCallback(
    async (data: IPerfilFormData) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          avatar: Yup.mixed().test(
            'type',
            'Formato de arquivo não suportado',
            file => (file ? file.type === 'image/jpeg' : true),
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await updateUser({
          ...user,
          name: data.name,
        });

        if (data.avatar) {
          await updateAvatar(data.avatar);
        }

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
    [setLoading, updateUser, user, navigate, addToast, updateAvatar],
  );

  return (
    <MainLayout>
      <Container>
        <Breadcrumb maxDepth={2} />
        <Form
          ref={formRef}
          initialData={{ name: user.name, email: user.email }}
          onSubmit={handleSubmit}
          noValidate
        >
          <div>
            <ImageInput
              name="avatar"
              accept=".jpg"
              defaultPreview={user.avatar && user.avatarUrl}
            />
          </div>
          <div>
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
          </div>
        </Form>
      </Container>
    </MainLayout>
  );
};

export default Perfil;
