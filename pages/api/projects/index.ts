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

        res.status(200).json({ projects });
      } catch (error) {
        res.status(400).json({ message: '400, Bad Request' });
      }
      break;
    case 'POST':
      try {
        const project = await ProjectModel.create(req.body);

        res.status(201).json({ project });
      } catch (error) {
        res.status(400).json({ message: '400, Bad Request' });
      }
      break;
    default:
      res.status(400).json({ message: '400, Bad Request' });
      break;
  }
};

export default handler;
