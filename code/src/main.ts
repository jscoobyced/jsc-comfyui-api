import express from 'express';
import router from './routes/router';
import { log } from './services/utils/log';

export const main = (port: number) => {
  const app = express();
  app.use(express.json());
  app.use('/', router);

  const server = app.listen(port, () => {
    log(`Server is running on http://localhost:${port.toString()}`);
  });
  return server;
};
