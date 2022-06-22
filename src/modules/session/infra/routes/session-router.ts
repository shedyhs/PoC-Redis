import { Router } from 'express';
import { expressAdaptRoute } from '@/main/adapters/express-route-adapter';
import { container } from '@/main/di/container';

export const sessionRouter = Router();

sessionRouter.post(
  '/auth/login',
  expressAdaptRoute(container.resolve('createSessionController')),
);
