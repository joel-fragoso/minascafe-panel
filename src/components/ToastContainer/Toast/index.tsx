import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useEffect } from 'react';
import { IToastMessage, useToast } from '../../../hooks/toast';
import { Container } from './styles';

const icons = {
  info: (
    <FontAwesomeIcon
      icon={{ prefix: 'fas', iconName: 'circle-info' }}
      size="1x"
    />
  ),
  success: (
    <FontAwesomeIcon
      icon={{ prefix: 'fas', iconName: 'circle-check' }}
      size="1x"
    />
  ),
  error: (
    <FontAwesomeIcon
      icon={{ prefix: 'fas', iconName: 'circle-exclamation' }}
      size="1x"
    />
  ),
};

interface IToastProps {
  message: IToastMessage;
  style: object;
}

const Toast: FC<IToastProps> = ({ message, style }: IToastProps) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => removeToast(message.id), 3000);

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
        <FontAwesomeIcon icon={{ prefix: 'fas', iconName: 'xmark' }} />
      </button>
    </Container>
  );
};

export default Toast;
