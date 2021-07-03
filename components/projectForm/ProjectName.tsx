import { FC, RefObject } from 'react';
import { FormSection, FormLabel, TextInput } from './ProjectFormStyles';

interface IProps {
  nameRef: RefObject<HTMLInputElement>;
}

const ProjectName: FC<IProps> = ({ nameRef }) => {
  return (
    <FormSection htmlFor='name'>
      <FormLabel>Project Name</FormLabel>
      <TextInput type='text' id='name' placeholder='Name' ref={nameRef} />
    </FormSection>
  );
};

export default ProjectName;
