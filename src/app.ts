import express, { Express } from 'express';
import connectMongoDb from './config/database';
import env from './config/env';
import { scenarioRoute, userRoute, accountRoute, appRoute } from './routes';

const app: Express = express();

// Parses incoming requests with JSON payloads
app.use(express.json());

// Parses incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: true }));

connectMongoDb();

app.listen(env.port, () => {
  console.log(`Example app listening on port ${env.port}`);
});

// User
app.use('/api/accounts', accountRoute);
app.use('/api/users', userRoute);
app.use('/api/scenarios', scenarioRoute);
app.use('/', appRoute);
