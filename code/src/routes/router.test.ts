import express from 'express';
import request from 'supertest';
import router from './router';

describe('index', () => {
  it('should have default route', async () => {
    const app = express();
    app.use('/', router);
    const server = app.listen(3000, () => {
      void 0;
    });
    await request(server).get('/').expect(200);
    server.close();
  });
});
