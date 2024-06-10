import express, { Express, Request, Response } from 'express';
import accountRoutes from './routes/accountRoute';
import appRouters from './routes/appRoute';

import connectMongoDb from './config/database';
import env from './config/env';

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
app.use('/api/accounts', accountRoutes);
app.use('/', appRouters);
