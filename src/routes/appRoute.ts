import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { Response, Request } from 'express';
import YAML from 'yamljs';
import { authenticationMiddleware } from '../middleware/authentication';

const router = Router();

const swaggerDocument = YAML.load('./swagger.yaml');

const helloWorldFn = (_: Request, res: Response) => {
  res.send('Hello World!');
};
router.get('/', (req: Request, res: Response) =>
  authenticationMiddleware(req, res, () => helloWorldFn(req, res))
);

// Swagger
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
