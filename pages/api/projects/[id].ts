import { NextApiHandler } from 'next';
import { getSession } from 'next-auth/client';
import { MethodHandler } from '@types';
import getProject from '@util/db/getProject';
import deleteProject from '@util/db/deleteProject';

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;

  const session = await getSession({ req });

  switch (method) {
    case 'get':
    case 'GET':
      await getHandler(req, res);
      break;
    case 'delete':
    case 'DELETE':
      if (!session) {
        return res.status(401).json({ message: 'Unauthorized request' });
      }

      await deleteHandler(req, res);
      break;
    default:
      return res.status(400).json({ message: 'Bad Request' });
  }
};

export default handler;

const getHandler: MethodHandler = async (req, res) => {
  const { id } = req.query;

  try {
    const project = await getProject(id as string);

    if (!project) {
      return res.status(422).json({ message: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ message: 'Bad request' });
  }
};

const deleteHandler: MethodHandler = async (req, res) => {
  const { id } = req.query;

  try {
    await deleteProject(id as string);

    fetch(process.env.DEPLOY_HOOK!);

    res.status(200).send('Project deleted');
  } catch (error) {
    res.status(400).json({ message: 'Bad Request' });
  }
};
