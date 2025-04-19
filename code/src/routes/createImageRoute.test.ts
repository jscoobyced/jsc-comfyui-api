import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import { createImageRoute } from './createImageRoute';

jest.mock('../services/utils/log');

jest.mock('../services/image/submitPrompt', () => ({
  submitPrompt: jest.fn(),
}));

describe('createImageRoute', () => {
  const mockJson = jest.fn();
  const mockStatus = jest.fn().mockImplementation(() => ({
    json: mockJson,
  }));

  beforeEach(() => {
    mockJson.mockClear();
    mockStatus.mockClear();
  });

  it('should return 400 if input is not in correct format', async () => {
    const request = {
      body: {},
    } as ExpressRequest;
    const response = {
      status: mockStatus,
    } as unknown as ExpressResponse;
    await createImageRoute(request, response);
    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({
      error:
        'Input is not in format of WorkflowInput:{ prompt, negative_prompt, seed, width, height }',
    });
  });

  it('should return 200 if input is not in correct format', async () => {
    const request = {
      body: {
        prompt: 'A beautiful landscape',
        negative_prompt: 'ugly, bad quality',
        seed: 12345,
        width: 512,
        height: 512,
      },
    } as unknown as ExpressRequest;

    const response = {
      status: mockStatus,
    } as unknown as ExpressResponse;
    await createImageRoute(request, response);
    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledTimes(1);
  });
});
