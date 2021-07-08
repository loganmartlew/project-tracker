import dbConnect from './dbConnect';
import { ProjectModel } from '@models/Project';

dbConnect();

const getProject = async (id: string) => {
  try {
    const project = await ProjectModel.findById(id);
    return project;
  } catch (err) {
    return null;
  }
};

export default getProject;
