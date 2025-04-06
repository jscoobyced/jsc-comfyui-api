import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';

export const defaultRoute = (
  request: ExpressRequest,
  response: ExpressResponse,
) => {
  void request;
  const message = process.env.APP_NAME ?? 'JSC API TypeScript';
  response.send(message);
};
