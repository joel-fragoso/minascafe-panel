import { FC } from 'react';
import { IModalMessage, useModal } from '../../hooks/modal';
import Button from '../Button';
import Icon from '../Icon';
import { Body, Container, Footer } from './styles';

const icons = {
  info: <Icon iconName="circle-info" />,
  success: <Icon iconName="circle-check" />,
  error: <Icon iconName="circle-exclamation" />,
  danger: <Icon iconName="triangle-exclamation" />,
};

interface IModalItemProps {
  message: IModalMessage;
  style: object;
}

const ModalItem: FC<IModalItemProps> = ({
  message,
  style,
}: IModalItemProps) => {
  const { hideModal } = useModal();

  return (
    <Container type={message.type} style={style}>
      <button type="button" onClick={hideModal}>
        <Icon iconName="xmark" />
      </button>
      <Body type={message.type}>
        {icons[message.type || 'info']}
        <div>
          <strong>{message.title}</strong>
          {message.description && <p>{message.description}</p>}
        </div>
      </Body>
      <Footer type={message.type}>
        <Button onClick={hideModal}>Cancelar</Button>
        <Button onClick={message.onConfirmation}>Confirmar</Button>
      </Footer>
    </Container>
  );
};

export default ModalItem;
