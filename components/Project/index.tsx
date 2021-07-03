import { server } from '@config';
import { FC } from 'react';
import Link from 'next/link';
import { useTheme } from 'styled-components';
import ProgressBar from '@ramonak/react-progress-bar';
import FeaturedIcon from '@components/FeaturedIcon';
import {
  ProjectContainer,
  ProjectHeading,
  ProjectName,
  ProjectDescription,
  StatusContainer,
  StatusBadge,
} from './ProjectStyles';
import getProjectProgress from '@util/getProjectProgress';
import { Project } from '@types';
import { Theme } from '@styles/theme';

interface ProjectProps {
  project: Project;
}

const ProjectComponent: FC<ProjectProps> = ({ project }) => {
  const theme = useTheme() as Theme;

  return (
    <ProjectContainer>
      <ProjectHeading>
        <Link href={`${server}/project/${project._id}`} passHref>
          <ProjectName>{project.name}</ProjectName>
        </Link>
        {project.featured && <FeaturedIcon />}
      </ProjectHeading>
      <ProjectDescription>{project.description}</ProjectDescription>
      <StatusContainer>
        <p>Status:</p>
        <StatusBadge>{project.status}</StatusBadge>
      </StatusContainer>
      <ProgressBar
        completed={getProjectProgress(project)}
        bgColor={theme.color_success}
        baseBgColor='#E9BCAF'
        isLabelVisible={false}
      />
    </ProjectContainer>
  );
};

export default ProjectComponent;
