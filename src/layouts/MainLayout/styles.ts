import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: inherit;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const Container = styled.div`
  height: inherit;
  display: flex;
  overflow: inherit;
`;

export const Content = styled.main`
  flex: 1;
  padding: 1.6rem;
  overflow-y: auto;
`;
