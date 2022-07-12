import { FC } from 'react';
import { IModalMessage, useModal } from '../../hooks/modal';
import Button from '../Button';
import Icon from '../Icon';
import { Body, Container, Footer } from './styles';

const icons = {
  info: <Icon iconName="circle-info" />,
  success: <Icon iconName="circle-check" />,
  error: <Icon iconName="circle-exclamation" />,
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
    <Container style={style}>
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
      <Footer>
        <Button size="small" isResponsive onClick={hideModal}>
          Cancelar
        </Button>
        <Button
          color="danger"
          size="small"
          isResponsive
          onClick={message.onConfirmation}
        >
          Confirmar
        </Button>
      </Footer>
    </Container>
  );
};

export default ModalItem;
