import dotenv from 'dotenv';

dotenv.config();

const env = {
  mongoUri: process.env.ATLAS_URI || '',
  port: process.env.PORT || 8080,
  jwtSecret: process.env.JWT_SECRET || '',
};

export default env;
