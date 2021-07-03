import dbConnect from '@util/dbConnect';
import { ProjectModel } from '@models/Project';
import { NextApiHandler } from 'next';

dbConnect();

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const projects = await ProjectModel.find({});

        return res.status(200).json(projects);
      } catch (error) {
        return res.status(400).json({ message: '400, Bad Request' });
      }
      break;
    case 'POST':
      try {
        const project = await ProjectModel.create(req.body);

        return res.status(201).json(project);
      } catch (error) {
        return res.status(400).json({ message: '400, Bad Request' });
      }
      break;
    default:
      return res.status(400).json({ message: '400, Bad Request' });
      break;
  }
};

export default handler;
