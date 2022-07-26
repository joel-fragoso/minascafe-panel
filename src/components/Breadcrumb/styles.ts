import styled from 'styled-components';

export const Container = styled.span`
  display: flex;
  align-items: center;
  padding-bottom: 1.6rem;
  text-transform: capitalize;

  > div {
    a {
      font-size: 1.4rem;
      text-decoration: none;
      color: inherit;
      opacity: 0.8;
      transition: opacity 0.3s linear;

      &:hover {
        opacity: 1;
      }
    }

    &:last-child {
      font-size: 1.4rem;
      color: inherit;
      opacity: 0.5;
    }

    svg {
      font-size: 0.8rem;
      padding: 0 0.8rem;
    }
  }
`;
