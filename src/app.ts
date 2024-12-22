import express, { Express } from 'express';

import cors from 'cors';
import connectMongoDb from './config/database';
import {
  scenarioRoute,
  userRoute,
  accountRoute,
  appRoute,
  dialogRoute,
  messageRoute,
} from './routes';

const app: Express = express();

// CORS config
app.use(cors());

// Parses incoming requests with JSON payloads
app.use(express.json());

// Parses incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: true }));

connectMongoDb();

// User
app.use('/api/accounts', accountRoute);
app.use('/api/users', userRoute);
app.use('/api/scenarios', scenarioRoute);
app.use('/api/dialogs', dialogRoute);
app.use('/api/messages', messageRoute);
app.use('/', appRoute);

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;