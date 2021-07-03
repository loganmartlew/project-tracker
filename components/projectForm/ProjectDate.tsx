import { FC, RefObject, SetStateAction } from 'react';
import Switch from 'react-switch';
import { FormSection, FormLabel, DatePicker } from './ProjectFormStyles';

interface IProps {
  id: string;
  label: string;
  dateRef: RefObject<HTMLInputElement>;
  setDate?: (value: SetStateAction<boolean>) => void;
  checked?: boolean;
  optional?: boolean;
}

const ProjectDate: FC<IProps> = props => {
  const { id, label, setDate, checked, dateRef, optional } = props;

  return (
    <FormSection htmlFor={id}>
      <FormLabel>{label}</FormLabel>
      {optional && setDate && checked !== undefined && (
        <Switch
          onChange={() => {
            setDate(prev => !prev);
          }}
          checked={checked}
          checkedIcon={false}
          uncheckedIcon={false}
        />
      )}
      {(checked || !optional) && (
        <DatePicker
          id={id}
          type='date'
          defaultValue='2021-01-01'
          InputLabelProps={{
            shrink: true,
          }}
          inputRef={dateRef}
        />
      )}
    </FormSection>
  );
};

export default ProjectDate;
