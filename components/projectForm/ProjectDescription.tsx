import { FC, RefObject } from 'react';
import { FormSection, FormLabel, TextArea } from './ProjectFormStyles';

interface IProps {
  descRef: RefObject<HTMLTextAreaElement>;
}

const ProjectDescription: FC<IProps> = ({ descRef }) => {
  return (
    <FormSection htmlFor='description'>
      <FormLabel>Project Description</FormLabel>
      <TextArea id='description' placeholder='Description' ref={descRef} />
    </FormSection>
  );
};

export default ProjectDescription;
