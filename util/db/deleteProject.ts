import { ProjectModel } from '@models/Project';
import dbConnect from './dbConnect';

dbConnect();

const deleteProject = async (id: string) => {
  try {
    await ProjectModel.findByIdAndDelete(id);
  } catch (err) {
    return;
  }
};

export default deleteProject;
