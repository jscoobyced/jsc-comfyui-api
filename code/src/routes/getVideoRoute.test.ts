import { getVideoRoute } from './getVideoRoute';
import { getAssetRoute } from './getAssetRoute';
import type { Request, Response } from 'express';

jest.mock('./getAssetRoute');

describe('getVideoRoute', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {};
    (getAssetRoute as jest.Mock).mockClear();
  });

    it('should call getAssetRoute with request, response, and video/webm', async () => {
    await getVideoRoute(req as Request, res as Response);
    expect(getAssetRoute).toHaveBeenCalledWith(req, res, 'video/webm');
  });
});
