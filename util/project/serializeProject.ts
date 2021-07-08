import { Project, SerializedProject } from '@types';

const serializeProject = (project: Project) => {
  const jsonProject = JSON.stringify(project);
  const serializedProject: SerializedProject = JSON.parse(jsonProject);

  return serializedProject;
};

export default serializeProject;
