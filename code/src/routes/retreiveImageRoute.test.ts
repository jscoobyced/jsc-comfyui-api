import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import * as getImage from '../services/image/getImage';
import { retreiveImageRoute } from './retreiveImageRoute';

jest.mock('../services/utils/log');
const mockGetImage = jest.spyOn(getImage, 'getImage');

describe('retreiveImageRoute', () => {
  jest.mock('../services/image/getImage', () => ({
    getImage: mockGetImage,
  }));
  const mockJson = jest.fn();
  const mockStatus = jest.fn().mockImplementation(() => ({
    json: mockJson,
  }));

  beforeEach(() => {
    mockJson.mockClear();
    mockStatus.mockClear();
  });

  it('should return 400 if there is no "id" parameter', async () => {
    const request = {
      body: {},
    } as ExpressRequest;
    const response = {
      status: mockStatus,
    } as unknown as ExpressResponse;
    await retreiveImageRoute(request, response);
    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({
      error: 'Invalid UUID format: undefined',
    });
  });

  it('should return 400 if input is not in correct format', async () => {
    const request = {
      params: {
        id: 'invalid-uuid',
      },
    } as unknown as ExpressRequest;
    const response = {
      status: mockStatus,
    } as unknown as ExpressResponse;
    await retreiveImageRoute(request, response);
    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({
      error: 'Invalid UUID format: invalid-uuid',
    });
  });

  it('should return 202 if image is not ready', async () => {
    mockGetImage.mockImplementation(async (imageUuid: string) => {
      void imageUuid;
      return {
        ready: false,
      };
    });
    const request = {
      params: {
        id: '366d21bc-faf8-4e5e-ac20-88468e25e6eb',
      },
    } as unknown as ExpressRequest;

    const response = {
      status: mockStatus,
    } as unknown as ExpressResponse;
    await retreiveImageRoute(request, response);
    expect(mockStatus).toHaveBeenCalledWith(202);
    expect(mockJson).toHaveBeenCalledTimes(1);
  });

  it('should return 200 if input is not in correct format and image is ready', async () => {
    mockGetImage.mockImplementation(async (imageUuid: string) => {
      void imageUuid;
      return {
        ready: true,
      };
    });

    const request = {
      params: {
        id: '366d21bc-faf8-4e5e-ac20-88468e25e6eb',
      },
    } as unknown as ExpressRequest;

    const response = {
      status: mockStatus,
    } as unknown as ExpressResponse;
    await retreiveImageRoute(request, response);
    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledTimes(1);
  });
});
