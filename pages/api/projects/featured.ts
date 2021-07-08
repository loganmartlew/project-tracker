import { NextApiHandler } from 'next';
import getProjects from '@util/db/getProjects';

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const projects = await getProjects();

  const filteredProjects = projects.filter(project => project.featured);

  return res.status(200).json([...filteredProjects]);
};

export default handler;
