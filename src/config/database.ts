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
