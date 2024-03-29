import { FC, ReactNode, useRef } from 'react';
import Icon from '../Icon';
import { Container, ContainerItem, ContainerNav } from './styles';

interface ICarouselContainerProps {
  children: ReactNode;
}

const CarouselContainer: FC<ICarouselContainerProps> = ({
  children,
}: ICarouselContainerProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (scrollOffset: number) => {
    if (carouselRef && carouselRef.current) {
      carouselRef.current.scrollBy({ left: scrollOffset });
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
      <ContainerItem ref={carouselRef}>{children}</ContainerItem>
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

export default CarouselContainer;
