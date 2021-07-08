import { getSession } from 'next-auth/client';
import { NextApiHandler } from 'next';
import { MethodHandler } from '@types';
import getProjects from '@util/db/getProjects';
import createProject from '@util/db/createProject';
import updateProject from '@util/db/updateProject';

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;

  const session = await getSession({ req });

  switch (method) {
    case 'get':
    case 'GET':
      await getHandler(req, res);
      break;
    case 'post':
    case 'POST':
      if (!session) {
        return res.status(401).json({ message: 'Unauthorized request' });
      }

      await postHandler(req, res);
      break;
    case 'patch':
    case 'PATCH':
      if (!session) {
        return res.status(401).json({ message: 'Unauthorized request' });
      }

      await patchHandler(req, res);
      break;
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;

const getHandler: MethodHandler = async (req, res) => {
  try {
    const projects = await getProjects();

    res.status(200).json(projects);
  } catch (error) {
    res.status(400).json({ message: 'Bad request' });
  }
};

const postHandler: MethodHandler = async (req, res) => {
  if (!req.body) {
    res.status(422).json({ message: 'Invalid input' });
  }

  try {
    await createProject(req.body);

    res.status(201).json({ message: 'Project created' });
  } catch (error) {
    res.status(400).json({ message: 'Bad request' });
  }
};

const patchHandler: MethodHandler = async (req, res) => {
  if (!req.body.id || !req.body.project) {
    res.status(422).json({ message: 'Invalid input' });
  }

  try {
    await updateProject(req.body.id, req.body.project);

    res.status(200).json({ message: 'Project updated' });
  } catch (error) {
    res.status(400).json({ message: 'Bad request' });
  }
};
