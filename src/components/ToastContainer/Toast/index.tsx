import { FC, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IToastMessage, useToast } from '../../../hooks/toast';
import Icon from '../../Icon';
import { Container } from './styles';

const icons = {
  info: <Icon iconName="circle-info" />,
  success: <Icon iconName="circle-check" />,
  error: <Icon iconName="circle-exclamation" />,
};

interface IToastProps {
  message: IToastMessage;
  style: object;
}

const Toast: FC<IToastProps> = ({ message, style }: IToastProps) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => removeToast(message.id), 5000);

    return () => clearTimeout(timer);
  }, [message.id, removeToast]);

  return (
    <Container
      type={message.type}
      hasdescription={Number(!!message.description)}
      style={style}
    >
      {icons[message.type || 'info']}
      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>
      <button type="button" onClick={() => removeToast(message.id)}>
        <Icon iconName="xmark" />
      </button>
    </Container>
  );
};

export default Toast;
