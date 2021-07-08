import { Project, SerializedProject } from '@types';

const projStringToDate = (project: SerializedProject) => {
  const newProject = {
    ...project,
    startDate: new Date(project.startDate),
    endDate: project.endDate ? new Date(project.endDate) : null,
    dueDate: project.dueDate ? new Date(project.dueDate) : null,
  };

  return newProject as Project;
};

export default projStringToDate;
