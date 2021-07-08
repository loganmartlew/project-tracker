import dbConnect from './dbConnect';
import { ProjectModel } from '@models/Project';

dbConnect();

const getProjects = async () => {
  const projects = await ProjectModel.find({});
  return projects;
};

export default getProjects;
