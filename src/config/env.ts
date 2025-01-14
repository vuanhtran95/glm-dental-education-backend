import dotenv from "dotenv";

dotenv.config();

const env = {
  mongoUri: process.env.ATLAS_URI || "",
  port: process.env.PORT || 9090,
  jwtSecret: process.env.JWT_SECRET || "",
  llamaApi: process.env.LLAMA_URL || "",
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  awsRegion: process.env.AWS_REGION || "",
  s3BucketName: process.env.S3_BUCKET_NAME || "",
  hfToken: process.env.HF_TOKEN || "",
  hfModel: process.env.HF_MODEL || "",
};

export default env;
