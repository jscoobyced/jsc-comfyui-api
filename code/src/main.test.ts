import request from 'supertest';
import { main } from './main';

jest.mock('./services/log');

describe('main', () => {
  it('should start the server', async () => {
    const server = main(3000);
    await request(server).get('/').expect(200);
    server.close();
  });
});
