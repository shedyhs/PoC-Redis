/* eslint-disable no-console */
import './config/module-alias';
import { app } from './config/app';

app.listen(process.env.PORT ?? 3334, () =>
  console.log(
    `🔥🔥🔥 Server started at ${process.env.URL ?? 'http://0.0.0.0'}:${
      process.env.PORT ?? '3334'
    } 🔥🔥🔥`,
  ),
);
