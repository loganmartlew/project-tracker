import dbConnect from '@util/dbConnect';
import { ProjectModel } from '@models/Project';
import { NextApiHandler } from 'next';

dbConnect();

const handler: NextApiHandler = async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const project = await ProjectModel.findById(id);

        if (!project) {
          return res.status(400).json({ message: '400, Bad Request' });
        }

        res.status(200).json({ project });
      } catch (error) {
        res.status(400).json({ message: '400, Bad Request', error });
      }
      break;
    default:
      res.status(400).json({ message: '400, Bad Request' });
      break;
  }
};

export default handler;
