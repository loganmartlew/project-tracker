import dbConnect from '@util/db/dbConnect';
import { ProjectModel } from '@models/Project';
import { NextApiHandler } from 'next';
import { getSession } from 'next-auth/client';

dbConnect();

const handler: NextApiHandler = async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  const session = await getSession({ req });

  switch (method) {
    case 'get':
    case 'GET':
      try {
        const project = await ProjectModel.findById(id);

        if (!project) {
          return res.status(400).json({ message: 'Bad Request' });
        }

        return res.status(200).json(project);
      } catch (error) {
        return res.status(400).json({ message: 'Bad Request', error });
      }
      break;
    case 'delete':
    case 'DELETE':
      if (!session) {
        return res.status(401).json({ message: 'Unauthorized request' });
      }

      try {
        await ProjectModel.findByIdAndDelete(id);

        return res.status(200).send('Project deleted');
      } catch (error) {
        return res.status(400).json({ message: 'Bad Request', error });
      }
      break;
    default:
      return res.status(400).json({ message: 'Bad Request' });
      break;
  }
};

export default handler;
