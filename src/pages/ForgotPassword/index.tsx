import { FC, useCallback, useRef } from 'react';
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

  const { loading, setLoading } = useLoading();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: IForgotPassword) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

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
        setLoading(false);
      }
    },
    [setLoading, addToast, navigate],
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
        <Button type="submit" isResponsive disabled={loading} loading={loading}>
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
