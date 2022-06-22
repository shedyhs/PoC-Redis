import { Router } from 'express';
import { expressAdaptRoute } from '@/main/adapters/express-route-adapter';
import { container } from '@/main/di/container';

export const healthCheckRouter = Router();

healthCheckRouter.get(
  '/health-check',
  expressAdaptRoute(container.resolve('healthCheckController')),
);

healthCheckRouter.get('/teste', (req, res) => {
  console.log(req.body);
  return res.send({ ok: true });
});
