import { FC, RefObject } from 'react';
import { FormSection, FormLabel, StatusSelect } from './ProjectFormStyles';
import { Status } from '@types';

interface IProps {
  statusRef: RefObject<HTMLSelectElement>;
}

const ProjectStatus: FC<IProps> = ({ statusRef }) => {
  return (
    <FormSection htmlFor='status'>
      <FormLabel>Status</FormLabel>
      <StatusSelect id='status' ref={statusRef}>
        {Object.values(Status).map((value, i) => (
          <option value={value} key={i}>
            {value}
          </option>
        ))}
      </StatusSelect>
    </FormSection>
  );
};

export default ProjectStatus;
