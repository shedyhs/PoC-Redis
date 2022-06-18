import './config/module-alias';
import { app } from './config/app';
import { container } from './di/container';

const loggerGateway = container.resolve('loggerGateway');

app.listen(process.env.PORT ?? 3334, () =>
  loggerGateway.info(
    `🔥🔥🔥 Server started at ${process.env.URL ?? 'http://0.0.0.0'}:${
      process.env.PORT ?? '3334'
    } 🔥🔥🔥`,
  ),
);
