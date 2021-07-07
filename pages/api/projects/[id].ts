import dbConnect from '@util/db/dbConnect';
import { ProjectModel } from '@models/Project';
import { NextApiHandler } from 'next';

dbConnect();

const handler: NextApiHandler = async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'get':
    case 'GET':
      try {
        const project = await ProjectModel.findById(id);

        if (!project) {
          return res.status(400).json({ message: '400, Bad Request' });
        }

        return res.status(200).json(project);
      } catch (error) {
        return res.status(400).json({ message: '400, Bad Request', error });
      }
      break;
    case 'delete':
    case 'DELETE':
      try {
        await ProjectModel.findByIdAndDelete(id);

        return res.status(200).send('Project deleted');
      } catch (error) {
        return res.status(400).json({ message: '400, Bad Request', error });
      }
      break;
    default:
      return res.status(400).json({ message: '400, Bad Request' });
      break;
  }
};

export default handler;
