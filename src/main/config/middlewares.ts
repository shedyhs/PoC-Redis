import { Express, json } from 'express';
import helmet from 'helmet';
import { expressAdaptMiddleware } from '../adapters/express-middleware-adapter';
import { container } from '../di/container';

export const setupMiddlewares = (app: Express): void => {
  app.use(json());
  app.use(helmet());
  app.use((req, res, next) => {
    res.set('access-control-allow-origin', '*');
    res.set('access-control-allow-methods', '*');
    res.set('access-control-allow-headers', '*');
    next();
  });
  app.use(expressAdaptMiddleware(container.resolve('loggerMiddleware')));
};
