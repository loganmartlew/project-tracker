import { Project } from '@types';

const projStringToDate = (project: Project) => {
  project.startDate = new Date(project.startDate);
  if (project.endDate) {
    project.endDate = new Date(project.endDate);
  }
  if (project.dueDate) {
    project.dueDate = new Date(project.dueDate);
  }
};

export default projStringToDate;
