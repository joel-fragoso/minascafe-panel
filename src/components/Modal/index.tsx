import { FC } from 'react';
import { useTransition } from 'react-spring';
import { IModalMessage, useModal } from '../../hooks/modal';
import ModalItem from '../ModalItem';
import { Container } from './styles';

interface IModalProps {
  message: IModalMessage | null;
}

const Modal: FC<IModalProps> = ({ message }: IModalProps) => {
  const { isOpen, hideModal } = useModal();

  const messageWithTransition = useTransition(message, {
    key: message?.title,
    from: { top: '-50%', opacity: 0, visibility: 'hidden' },
    enter: { top: '0', opacity: 1, visibility: 'visible' },
    leave: { top: '-50%', opacity: 0 },
  });

  return (
    <Container isOpen={isOpen} onClick={hideModal}>
      {messageWithTransition(
        (style, item) => item && <ModalItem style={style} message={item} />,
      )}
    </Container>
  );
};

export default Modal;
