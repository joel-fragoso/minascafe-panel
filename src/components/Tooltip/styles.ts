import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    width: 16rem;
    background-color: ${({ theme }) => theme.pallete.primary.main};
    padding: 0.8rem;
    border-radius: 0.4rem;
    font-size: 1.4rem;
    font-weight: 700;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.4s linear;
    position: absolute;
    bottom: calc(100% + 12px);
    right: -180%;

    color: ${({ theme }) => theme.background.default};

    &::before {
      content: '';
      border-style: solid;
      border-color: ${({ theme }) => theme.pallete.primary.main} transparent;
      border-width: 6px 6px 0 6px;
      position: absolute;
      top: 100%;
      left: 73%;

      @media (min-width: 767px) {
        left: 50%;
        transform: translateX(-50%);
      }
    }

    @media (min-width: 767px) {
      right: unset;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    visibility: visible;
    opacity: 1;
  }
`;
