import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import { defaultRoute } from './defaultRoute';

describe('Default Route', () => {
  it('should return a greeting message', () => {
    const request = {} as ExpressRequest;
    const response = {
      send: jest.fn(),
    } as unknown as ExpressResponse;
    defaultRoute(request, response);
    expect(response.send).toHaveBeenCalledWith('JSC ComfyUI API');
  });
});
