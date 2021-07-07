import dbConnect from '@util/db/dbConnect';
import { ProjectModel } from '@models/Project';
import { NextApiHandler } from 'next';

dbConnect();

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'get':
    case 'GET':
      try {
        const projects = await ProjectModel.find({});

        return res.status(200).json(projects);
      } catch (error) {
        return res.status(400).json({ message: '400, Bad Request' });
      }
      break;
    case 'post':
    case 'POST':
      try {
        const project = await ProjectModel.create(req.body);

        return res.status(201).json(project);
      } catch (error) {
        return res.status(400).json({ message: '400, Bad Request' });
      }
      break;
    case 'patch':
    case 'PATCH':
      try {
        const project = await ProjectModel.findByIdAndUpdate(
          req.body.id,
          req.body.project
        );

        return res.status(200).json(project);
      } catch (error) {
        console.log('ERROR');
        return res.status(400).json({ message: '400, Bad Request', error });
      }
      break;
    default:
      return res.status(400).json({ message: '400, Bad Request' });
      break;
  }
};

export default handler;
