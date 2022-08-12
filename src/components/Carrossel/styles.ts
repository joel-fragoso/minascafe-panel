import styled from 'styled-components';

export const Container = styled.div``;

export const ContainerItem = styled.div`
  display: flexbox;
  flex-wrap: nowrap;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ContainerNav = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  top: -8rem;
  visibility: hidden;

  svg {
    font-size: 3rem;
    color: ${({ theme }) => theme.background.default};
    opacity: 0.2;
    transition: color 0.4s ease-in-out;
    transition: opacity 0.4s ease-in-out;
    visibility: visible;

    &:hover {
      color: ${({ theme }) => theme.background.paper};
      opacity: 0.8;
    }
  }
`;
