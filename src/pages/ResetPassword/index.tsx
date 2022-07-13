import { FC, useCallback, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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

interface IResetPassword {
  password: string;
  passwordConfirmation: string;
}

const ResetPassword: FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, setLoading } = useLoading();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: IResetPassword) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatório'),
          passwordConfirmation: Yup.string().oneOf(
            [Yup.ref('password')],
            'Confirmação incorreta',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }

        await api.post('/senha/reseta', {
          token,
          password: data.password,
          passwordConfirmation: data.passwordConfirmation,
        });

        addToast({
          type: 'success',
          title: 'Alteração de senha',
          description:
            'A senha foi alterada com sucesso, você já pode fazer login',
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
          title: 'Erro ao resetar a senha',
          description: 'Ocorreu um erro ao resetar a senha, tente novamente',
        });
      } finally {
        setLoading(false);
      }
    },
    [setLoading, location.search, addToast, navigate],
  );

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit} noValidate>
        <h1>Resetar senha</h1>
        <Input
          name="password"
          type="password"
          placeholder="Senha"
          iconName="lock"
        />
        <Input
          name="passwordConfirmation"
          type="password"
          placeholder="Confirmação de senha"
          iconName="lock"
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

export default ResetPassword;
