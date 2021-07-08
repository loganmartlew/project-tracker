import dbConnect from './dbConnect';
import { ProjectModel } from '@models/Project';
import { Project } from '@types';

dbConnect();

const createProject = async (project: Project) => {
  await ProjectModel.create(project);
};

export default createProject;
