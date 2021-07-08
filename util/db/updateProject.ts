import dbConnect from './dbConnect';
import { ProjectModel } from '@models/Project';
import { Project } from '@types';

dbConnect();

const updateProject = async (id: string, project: Project) => {
  try {
    await ProjectModel.findByIdAndUpdate(id, project);
  } catch (err) {
    return;
  }
};

export default updateProject;
