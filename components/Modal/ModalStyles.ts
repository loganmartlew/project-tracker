import styled from 'styled-components';

export const ModalOverlay = styled.div`
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  max-width: 90vw;
  background: white;
  border-radius: 15px;
  padding: 2em;
  color: black;
  font-size: 1.1rem;
`;
