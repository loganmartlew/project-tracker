import ProjectComponent from '../Project';
import { List } from './ProjectListStyles';
import { Project } from '@types';
import { FC } from 'react';

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: FC<ProjectListProps> = ({ projects }) => {
  return (
    <List>
      {projects &&
        projects.map(project => (
          <ProjectComponent project={project} key={project.name} />
        ))}
    </List>
  );
};

export default ProjectList;
