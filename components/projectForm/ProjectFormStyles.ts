import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

export const FormSection = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.7em;
`;

export const FormLabel = styled.span`
  font-size: 1.4rem;
`;

interface TextInputProps {
  small?: boolean;
  block?: boolean;
}

export const TextInput = styled.input<TextInputProps>`
  padding: 10px 25px;
  width: 100%;
  min-width: 225px;
  max-width: 500px;
  border: none;
  border-radius: 500px;
  outline: none;
  background-color: ${props => props.theme.color_primary};
  color: ${props => props.theme.color_white};
  font-size: 1.2em;
  letter-spacing: 0.5px;

  &::placeholder {
    color: inherit;
    opacity: 0.7;
  }

  ${({ small }) => {
    if (small)
      return `
    padding: 4px 15px;
    width: auto;
    min-width: 0;
    max-width: 280px;
    font-size: 1em;
  `;
  }}

  ${({ block }) => {
    if (block)
      return `
    max-width: 500px;
    `;
  }}
`;

interface TextAreaProps {
  small?: boolean;
}

export const TextArea = styled.textarea<TextAreaProps>`
  padding: 10px 25px;
  width: 100%;
  min-width: 225px;
  max-width: 500px;
  height: 150px;
  border: none;
  border-radius: 21px;
  outline: none;
  background-color: ${props => props.theme.color_primary};
  color: ${props => props.theme.color_white};
  font-size: 1.2em;
  font-family: inherit;
  letter-spacing: 0.5px;

  &::placeholder {
    color: inherit;
    opacity: 0.7;
  }

  ${({ small }) => {
    if (small)
      return `
    padding: 4px 15px;
    width: auto;
    min-width: 0;
    border-radius: 13px;
    font-size: 1em;
    `;
  }}
`;

export const LinkSection = styled.div`
  width: 100%;
`;

export const LinkList = styled.ul``;

export const LinkItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5em;
  margin-bottom: 1em;

  & > * {
    flex-grow: 1;
  }

  & button,
  & span {
    flex-grow: unset;
    flex-basis: 50px;
  }
`;

export const LinkName = styled.p`
  padding: 4px 15px 4px 0;
  max-width: 280px;
`;

export const LinkURL = styled.p`
  padding: 4px 15px 4px 25px;
  max-width: 280px;
`;

interface LinkBtnProps {
  $fill?: boolean;
  milestone?: boolean;
  sort?: boolean;
}

export const LinkBtn = styled.span<LinkBtnProps>`
  display: grid;
  place-content: center;
  font-size: 1.5em;
  transition: 100ms;
  cursor: pointer;

  ${({ $fill, milestone, sort, theme }) => {
    if ($fill) {
      return `
      padding: 3px 0;
      border-radius: 500px;
      background-color: ${theme.color_primary};
      font-size: 1.3em;

      &:hover {
        background-color: ${theme.color_primary_light};
      }
    `;
    } else if (milestone) {
      return `
        &:hover {
          color: red;
        }
      `;
    } else if (sort) {
      return `
        height: max-content;

        &:hover {
          color: ${theme.color_primary_light};
        }
      `;
    } else {
      return `
        &:hover {
          color: ${theme.color_primary};
        }
      `;
    }
  }}
`;

export const DatePicker = styled(TextField)`
  padding: 10px 25px 15px 25px !important;
  width: max-content;
  border-radius: 21px;
  background-color: ${({ theme }) => theme.color_primary};

  input {
    color: white;
  }

  .MuiInput-underline {
    &:before,
    &:after {
      border-color: white;
    }
  }
`;

export const StatusSelect = styled.select`
  padding: 10px;
  max-width: 300px;
  border-radius: 10px;
  outline: none;
`;

export const MilestoneSection = styled.div`
  max-width: 500px;
`;

export const MilestoneList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
`;

export const MilestoneItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5em;
  padding: 10px 25px;
  border-radius: 13px;
  background-color: ${({ theme }) => theme.color_primary};

  & p {
    word-wrap: break-word;
  }
`;

export const MilestoneTopRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const MilestoneMiddleRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const MilestoneBottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MilestoneForm = styled.li`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;
