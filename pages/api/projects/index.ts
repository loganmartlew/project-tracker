import { getSession } from 'next-auth/client';
import dbConnect from '@util/db/dbConnect';
import { ProjectModel } from '@models/Project';
import { NextApiHandler } from 'next';
import { MethodHandler } from '@types';

dbConnect();

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;

  const session = await getSession({ req });

  let resData;

  switch (method) {
    case 'get':
    case 'GET':
      resData = await getHandler(req);
      break;
    case 'post':
    case 'POST':
      if (!session) {
        return res.status(401).json({ message: 'Unauthorized request' });
      }

      resData = await postHandler(req);
      break;
    case 'patch':
    case 'PATCH':
      if (!session) {
        return res.status(401).json({ message: 'Unauthorized request' });
      }

      resData = await patchHandler(req);
      break;
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }

  return res
    .status(resData.status)
    .json(resData.data || { message: resData.message });
};

export default handler;

const getHandler: MethodHandler = async req => {
  try {
    const projects = await ProjectModel.find({});

    return { status: 200, message: 'Projects found', data: projects };
  } catch (error) {
    return { status: 400, message: 'Bad request', data: null };
  }
};

const postHandler: MethodHandler = async req => {
  try {
    await ProjectModel.create(req.body);

    return { status: 201, message: 'Project created', data: null };
  } catch (error) {
    return { status: 400, message: 'Bad request', data: null };
  }
};

const patchHandler: MethodHandler = async req => {
  try {
    await ProjectModel.findByIdAndUpdate(req.body.id, req.body.project);

    return { status: 200, message: 'Project updated', data: null };
  } catch (error) {
    return { status: 400, message: 'Bad request', data: null };
  }
};
