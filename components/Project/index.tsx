import ProgressBar from '@ramonak/react-progress-bar';
import {
  ProjectContainer,
  ProjectHeading,
  ProjectDescription,
  StatusContainer,
  StatusBadge,
} from './ProjectStyles';
import { Milestone, Project } from '@types';
import { FC } from 'react';

interface ProjectProps {
  project: Project;
}

const ProjectComponent: FC<ProjectProps> = ({ project }) => {
  const completedMilestones = project.milestones.reduce((count, curr) => {
    if (curr.complete) return count + 1;
    return count;
  }, 0);

  const progress = (completedMilestones / project.milestones.length) * 100;

  return (
    <ProjectContainer>
      <ProjectHeading>{project.name}</ProjectHeading>
      <ProjectDescription>{project.description}</ProjectDescription>
      <StatusContainer>
        <p>Status:</p>
        <StatusBadge>{project.status}</StatusBadge>
      </StatusContainer>
      <ProgressBar
        completed={progress}
        bgColor='#2fce7e'
        baseBgColor='#E9BCAF'
        isLabelVisible={false}
      />
    </ProjectContainer>
  );
};

export default ProjectComponent;
