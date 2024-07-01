import { PollyClient } from '@aws-sdk/client-polly';
import env from '../../config/env';

const region = env.awsRegion;
const accessKeyId = env.awsAccessKeyId;
const secretAccessKey = env.awsSecretAccessKey;

const pollyClient = new PollyClient({
  region,
  credentials: { accessKeyId, secretAccessKey },
});

export default pollyClient;
