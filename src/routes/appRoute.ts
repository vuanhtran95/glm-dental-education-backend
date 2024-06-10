import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { Response } from 'express';
import YAML from 'yamljs';

const router = Router();

const swaggerDocument = YAML.load('./swagger.yaml');

// Swagger
router.get('/', (_, res: Response) => {
  res.send('Hello World!');
});
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
