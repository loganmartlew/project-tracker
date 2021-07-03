import { FC, SetStateAction } from 'react';
import Switch from 'react-switch';
import { FormSection, FormLabel } from './ProjectFormStyles';

interface IProps {
  featured: boolean;
  setFeatured: (value: SetStateAction<boolean>) => void;
}

const ProjectFeatured: FC<IProps> = ({ featured, setFeatured }) => {
  return (
    <FormSection>
      <FormLabel>Featured Project</FormLabel>
      <Switch
        onChange={() => {
          setFeatured(prev => !prev);
        }}
        checked={featured}
        checkedIcon={false}
        uncheckedIcon={false}
      />
    </FormSection>
  );
};

export default ProjectFeatured;
