import express, { Express } from 'express';
import ip from 'ip';
import https from 'https'
import path from "path";
import fs from "fs";
import morgan from "morgan";

import cors from 'cors';
import connectMongoDb from './config/database';
import env from './config/env';
import {
  scenarioRoute,
  userRoute,
  accountRoute,
  appRoute,
  dialogRoute,
  messageRoute,
} from './routes';

const app: Express = express();

// Read SSL certificate and key files
const options = {
  key: fs.readFileSync(path.join(__dirname, "..", "localhost-key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "..", "localhost.pem")),
};



const ipAddress = ip.address();

// CORS config
app.use(cors());

// Parses incoming requests with JSON payloads
app.use(express.json());

// Parses incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(morgan("dev"));

connectMongoDb();



// User
app.use('/api/accounts', accountRoute);
app.use('/api/users', userRoute);
app.use('/api/scenarios', scenarioRoute);
app.use('/api/dialogs', dialogRoute);
app.use('/api/messages', messageRoute);
app.use('/', appRoute);

const server = https.createServer(options, app);

server.listen(env.port, () => {
  console.log(`Example app listening on IP: ${ipAddress} Port:${env.port}`);
});


