import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import { getAssetRoute } from './getAssetRoute';

export const getVideoRoute = async (
  request: ExpressRequest,
  response: ExpressResponse,
) => {
  getAssetRoute(request, response, 'video/webm');
};
