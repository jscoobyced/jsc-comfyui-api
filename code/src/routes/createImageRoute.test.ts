import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import { createImageRoute } from './createImageRoute';

jest.mock('../services/log');

describe('createImageRoute', () => {
  it('should return 400 if input is not in correct format', () => {
    const request = {
      body: {},
    } as ExpressRequest;
    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockImplementation(() => ({
      json: mockJson,
    }));
    const response = {
      status: mockStatus,
    } as unknown as ExpressResponse;
    createImageRoute(request, response);
    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({
      error:
        'Input is not in format of WorkflowInput:{ prompt, negative_prompt, seed, width, height }',
    });
  });

  it('should return 200 if input is not in correct format', () => {
    const request = {
      body: {
        prompt: 'A beautiful landscape',
        negative_prompt: 'ugly, bad quality',
        seed: 12345,
        width: 512,
        height: 512,
      },
    } as unknown as ExpressRequest;

    const mockSend = jest.fn();

    const mockStatus = jest.fn().mockImplementation(() => ({
      send: mockSend,
    }));
    const response = {
      status: mockStatus,
    } as unknown as ExpressResponse;
    createImageRoute(request, response);
    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockSend).toHaveBeenCalledTimes(1);
  });
});
