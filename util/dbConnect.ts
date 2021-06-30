import { connect } from 'mongoose';

const connection: { isConnected?: number } = {};

const dbConnect = async () => {
  if (connection.isConnected) {
    return;
  }

  const db = await connect(process.env.MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection.isConnected = db.connections[0].readyState;
};

export default dbConnect;
