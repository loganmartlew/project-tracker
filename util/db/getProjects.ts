import dbConnect from './dbConnect';
import { ProjectModel } from '@models/Project';
import { Project } from '@types';

dbConnect();

const getProjects = async () => {
  const projects: Project[] = await ProjectModel.find({});
  return projects;
};

export default getProjects;
