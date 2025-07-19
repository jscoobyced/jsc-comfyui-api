import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import { getAssetRoute } from './getAssetRoute';

export const getImageRoute = async (
  request: ExpressRequest,
  response: ExpressResponse,
) => {
  await getAssetRoute(request, response, 'image/png');
};
