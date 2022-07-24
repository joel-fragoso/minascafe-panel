import { FC } from 'react';
import { ICardMessage } from '../../../hooks/card';
import isIconName from '../../../utils/getIconsNames';
import Icon from '../../Icon';
import { Container } from './styles';

interface ICardProps {
  message: ICardMessage;
}

const Card: FC<ICardProps> = ({ message }: ICardProps) => {
  return (
    <Container hasdescription={Number(!!message.description)}>
      <div>
        {isIconName(message.titleIcon) && <Icon iconName={message.titleIcon} />}
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>
      <div>{message.value}</div>
    </Container>
  );
};

export default Card;
