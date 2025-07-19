import { getImageRoute } from './getImageRoute';
import { getAssetRoute } from './getAssetRoute';
import type { Request, Response } from 'express';
import { AssetType } from '../models/asset';

jest.mock('./getAssetRoute');

describe('getImageRoute', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {};
    (getAssetRoute as jest.Mock).mockClear();
  });

  it('should call getAssetRoute with request, response, and image/png', async () => {
    await getImageRoute(req as Request, res as Response);
    expect(getAssetRoute).toHaveBeenCalledWith(req, res, AssetType.IMAGE);
  });
});
