import { FC, useCallback, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import api from '../../services/api';
import { useLoading } from '../../hooks/loading';
import { useToast } from '../../hooks/toast';
import { Errors } from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import { Container } from './styles';

interface IForgotPassword {
  email: string;
}

const ForgotPassword: FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();
  const { loading, handleLoading } = useLoading();

  const { addToast } = useToast();

  useEffect(() => {
    handleLoading(false);
  }, [handleLoading]);

  const handleSubmit = useCallback(
    async (data: IForgotPassword) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        handleLoading(true);

        await api.post('/senha/esqueci', {
          email: data.email,
        });

        addToast({
          type: 'success',
          title: 'E-mail de recuperação enviado',
          description:
            'Enviamos um e-mail para confirmar a recuperação de senha, cheque a sua caixa de entrada',
        });

        navigate('/');
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
          title: 'Erro na recuperação de senha',
          description:
            'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente',
        });
      } finally {
        handleLoading(false);
      }
    },
    [handleLoading, navigate, addToast],
  );

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit} noValidate>
        <h1>Recuperar senha</h1>
        <Input
          spellCheck={false}
          name="email"
          type="email"
          placeholder="Usuário"
          iconName="user"
        />
        <Button type="submit" disabled={loading} loading={loading}>
          Enviar
        </Button>
        <Link to="/">
          <Icon iconName="arrow-left-long" />
          Voltar para o login
        </Link>
      </Form>
    </Container>
  );
};

export default ForgotPassword;
