import { FC } from 'react';
import Icon from '../Icon';
import { Container, PageButton } from './style';

interface IPaginetionProps {
  numberOfPages: number;
  currentPage: number;
  setCurrentPage(page: number): void;
}

const ButtonList: FC<IPaginetionProps> = ({
  numberOfPages,
  currentPage,
  setCurrentPage,
}) => {
  const numbers = Array.from({ length: numberOfPages }, (v, i) => i);
  const numPages: Array<Array<number>> = [];

  if (currentPage === 1) {
    numbers.map(() => numPages.push(numbers.splice(currentPage - 1, 3)));
  } else if (currentPage === numberOfPages && numberOfPages > 2) {
    numbers.map(() => numPages.push(numbers.splice(currentPage - 3, 3)));
  } else {
    numbers.map(() => numPages.push(numbers.splice(currentPage - 2, 3)));
  }

  return (
    <>
      {numPages[0].map(num => (
        <PageButton
          key={num}
          type="button"
          onClick={() => setCurrentPage(num + 1)}
          active={currentPage === num + 1}
        >
          {num + 1}
        </PageButton>
      ))}
    </>
  );
};

const Pagination: FC<IPaginetionProps> = ({
  numberOfPages,
  currentPage,
  setCurrentPage,
}) => {
  return (
    <Container>
      <PageButton
        type="button"
        disabled={currentPage === 1}
        disabledButton={currentPage === 1}
        active={currentPage !== 1}
        onClick={() => setCurrentPage(1)}
      >
        <Icon iconName="angles-left" />
      </PageButton>
      <PageButton
        type="button"
        disabled={currentPage === 1}
        disabledButton={currentPage === 1}
        active={currentPage !== 1}
        onClick={() =>
          setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)
        }
      >
        <Icon iconName="angle-left" />
      </PageButton>
      <ButtonList
        numberOfPages={numberOfPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <PageButton
        type="button"
        disabled={currentPage === numberOfPages}
        disabledButton={currentPage === numberOfPages}
        active={currentPage !== numberOfPages}
        onClick={() =>
          setCurrentPage(
            currentPage < numberOfPages ? currentPage + 1 : currentPage,
          )
        }
      >
        <Icon iconName="angle-right" />
      </PageButton>
      <PageButton
        type="button"
        disabled={currentPage === numberOfPages}
        disabledButton={currentPage === numberOfPages}
        active={currentPage !== numberOfPages}
        onClick={() => setCurrentPage(numberOfPages)}
      >
        <Icon iconName="angles-right" />
      </PageButton>
    </Container>
  );
};

export default Pagination;
