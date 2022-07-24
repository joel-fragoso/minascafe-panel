import { FC, useRef } from 'react';
import { ICardMessage } from '../../hooks/card';
import Icon from '../Icon';
import Card from './Card';
import { Container, ContainerItem, ContainerNav } from './styles';

interface ICardContainerProps {
  messages: ICardMessage[];
}

const CardContainer: FC<ICardContainerProps> = ({
  messages,
}: ICardContainerProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const scroll = (scrollOffset: number) => {
    if (cardRef && cardRef.current) {
      cardRef.current.scrollBy({ left: scrollOffset });
    }
  };

  let throttle = true;

  const handleWheel = (event: React.WheelEvent) => {
    if (throttle) {
      scroll(event.deltaY * 3);
      throttle = false;
      setTimeout(() => {
        throttle = true;
      }, 300);
    }
  };

  return (
    <Container onWheel={e => handleWheel(e)}>
      <ContainerItem ref={cardRef}>
        {messages &&
          messages.map(message => <Card key={message.id} message={message} />)}
      </ContainerItem>
      <ContainerNav>
        <button
          type="button"
          onClick={() => {
            scroll(-300);
          }}
        >
          <Icon iconName="circle-chevron-left" />
        </button>
        <button
          type="button"
          onClick={() => {
            scroll(300);
          }}
        >
          <Icon iconName="circle-chevron-right" />
        </button>
      </ContainerNav>
    </Container>
  );
};

export default CardContainer;
