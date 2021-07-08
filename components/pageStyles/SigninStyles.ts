import styled from 'styled-components';

export const PageWrapper = styled.div`
  display: grid;
  place-content: center;
  min-height: 70vh;
`;

export const Heading = styled.h2`
  font-size: 2rem;
  margin-bottom: 0.7em;
`;

export const SigninForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

export const FormField = styled.label`
  display: flex;
  align-items: center;
  gap: 1em;
`;

export const FieldLabel = styled.span`
  flex-basis: 77px;
`;

export const FieldInput = styled.input`
  flex-grow: 1;
  padding: 5px 10px;
  border: none;
  border-radius: 500px;
  outline: none;
  background-color: ${({ theme }) => theme.color_primary};
  font-size: 1rem;
  color: white;
`;
