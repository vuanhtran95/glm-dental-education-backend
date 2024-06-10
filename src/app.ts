import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { authenticationMiddleware } from './middleware/authentication';
import User from './models/User';
import jwt from 'jsonwebtoken';
// Swagger
const swaggerDocument = YAML.load('./swagger.yaml');

require('dotenv').config();

const ATLAS_URI = process.env.ATLAS_URI || '';

const jwtSecret = process.env.JWT_SECRET || '';

const app: Express = express();

// Parses incoming requests with JSON payloads
app.use(express.json());

// Parses incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;

mongoose
  .connect(ATLAS_URI, {})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get('/', (_, res: Response) => {
  res.send('Hello World!');
});

// Register User
app.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).send('User registered');
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login User
app.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send('Invalid login credentials');
    }

    const token = jwt.sign({ _id: user._id }, jwtSecret, {
      expiresIn: '24h',
    });
    res.send({ token });
  } catch (error) {
    console.error(error, 'error');
    res.status(500).send(error);
  }
});

app.get('/check-authentication', (req, res) => {
  res.send('Authenticated');
});
