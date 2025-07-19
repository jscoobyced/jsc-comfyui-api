import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import { getAssetRoute } from './getAssetRoute';
import { AssetType } from '../models/asset';

export const getImageRoute = async (
  request: ExpressRequest,
  response: ExpressResponse,
) => {
  await getAssetRoute(request, response, AssetType.IMAGE);
};
