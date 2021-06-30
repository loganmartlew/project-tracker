import ProgressBar from '@ramonak/react-progress-bar';
import {
  ProjectContainer,
  ProjectHeading,
  ProjectDescription,
  StatusContainer,
  StatusBadge,
} from './ProjectStyles';
import { Project } from '@types';
import { FC } from 'react';

interface ProjectProps {
  project: Project;
}

const ProjectComponent: FC<ProjectProps> = ({ project }) => {
  return (
    <ProjectContainer>
      <ProjectHeading>{project.name}</ProjectHeading>
      <ProjectDescription>{project.description}</ProjectDescription>
      <StatusContainer>
        <p>Status:</p>
        <StatusBadge>{project.status}</StatusBadge>
      </StatusContainer>
      <ProgressBar
        completed={60}
        bgColor='#2fce7e'
        baseBgColor='#E9BCAF'
        isLabelVisible={false}
      />
    </ProjectContainer>
  );
};

export default ProjectComponent;
