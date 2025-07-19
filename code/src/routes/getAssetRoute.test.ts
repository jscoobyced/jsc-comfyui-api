import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import * as getAsset from '../services/assets/getAsset';
import { getAssetRoute } from './getAssetRoute';

jest.mock('../services/utils/log');
const getAssetSpy = jest.spyOn(getAsset, 'getAsset');

describe('retreiveImageRoute', () => {
  jest.mock('../services/assets/getAsset', () => ({
    getAsset: getAssetSpy,
  }));
  const mockJson = jest.fn();
  const mockSend = jest.fn();
  const mockStatus = jest.fn().mockImplementation(() => ({
    json: mockJson,
    header: jest.fn().mockImplementation(() => ({
      send: mockSend,
    })),
  }));

  beforeEach(() => {
    mockJson.mockClear();
    mockStatus.mockClear();
    mockSend.mockClear();
  });

  it('should return 400 if there is no "id" parameter', async () => {
    const request = {
      body: {},
    } as ExpressRequest;
    const response = {
      status: mockStatus,
    } as unknown as ExpressResponse;
    await getAssetRoute(request, response, 'image/png' as string);
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
    await getAssetRoute(request, response, 'image/png' as string);
    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({
      error: 'Invalid UUID format: invalid-uuid',
    });
  });

  it('should return 202 if image is not ready', async () => {
    getAssetSpy.mockResolvedValue(false);
    const request = {
      params: {
        id: '366d21bc-faf8-4e5e-ac20-88468e25e6eb',
      },
    } as unknown as ExpressRequest;

    const response = {
      status: mockStatus,
    } as unknown as ExpressResponse;
    await getAssetRoute(request, response, 'image/png' as string);
    expect(mockStatus).toHaveBeenCalledWith(202);
    expect(mockJson).toHaveBeenCalledTimes(1);
  });

  it('should return 200 if input is not in correct format and image is ready', async () => {
    getAssetSpy.mockResolvedValue(new ArrayBuffer());

    const request = {
      params: {
        id: '366d21bc-faf8-4e5e-ac20-88468e25e6eb',
      },
    } as unknown as ExpressRequest;

    const response = {
      status: mockStatus,
    } as unknown as ExpressResponse;
    await getAssetRoute(request, response, 'image/png' as string);
    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockSend).toHaveBeenCalledTimes(1);
  });
});
