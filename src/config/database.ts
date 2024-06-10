// import { MongoClient } from 'mongodb';
// const mongoUrl = process.env.ATLAS_URI || '';
// const client = new MongoClient(mongoUrl);
// let conn;
// try {
//   conn = await client.connect();
// } catch (e) {
//   console.error(e);
// }
// let db = conn.db('sample_training');
// export default db;

import mongoose from 'mongoose';
import env from './env';

const connectMongoDb = async () => {
  try {
    await mongoose
      .connect(env.mongoUri, {})
      .then(() => console.log('MongoDB connected'))
      .catch((err) => console.log(err));

    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
    process.exit(1);
  }
};

export default connectMongoDb;
