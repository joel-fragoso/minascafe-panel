import { FC } from 'react';
import { useTransition } from 'react-spring';
import { IToastMessage } from '../../hooks/toast';
import { Container } from './styles';
import Toast from './Toast';

interface IToastContainerProps {
  messages: IToastMessage[];
}

const ToastContainer: FC<IToastContainerProps> = ({
  messages,
}: IToastContainerProps) => {
  const messagesWithTransition = useTransition(messages, {
    keys: message => message.id,
    from: { right: '-120%', opacity: 0, visibility: 'hidden' },
    enter: { right: '0', opacity: 1, visibility: 'visible' },
    leave: { right: '-120%', opacity: 0 },
  });

  return (
    <Container>
      {messagesWithTransition(
        (style, item) => item && <Toast style={style} message={item} />,
      )}
    </Container>
  );
};

export default ToastContainer;
