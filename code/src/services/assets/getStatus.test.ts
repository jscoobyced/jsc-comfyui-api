import { sampleHistoryData, sampleAssetUuid } from '../../models/history';
import { QueueData } from '../../models/queue';
import * as getHistory from './getHistory';
import * as getAssetUrl from './getAssetUrl';
import * as getQueue from './getQueue';
import { getStatus } from './getStatus';
import { AssetType } from '../../models/asset';

jest.mock('../utils/log');

const getQueueSpy = jest.spyOn(getQueue, 'getQueue');
const getHistorySpy = jest.spyOn(getHistory, 'getHistory');
const getAssetUrlSpy = jest.spyOn(getAssetUrl, 'getAssetUrl');

const imageQueueData: QueueData = [1, sampleAssetUuid];
const notReady = { ready: false };

describe('getStatus', () => {
  it('should throw an error if COMFYUI_URL is not defined', async () => {
    delete process.env.COMFYUI_URL;
    await expect(getStatus('123456789', AssetType.IMAGE)).rejects.toThrow(
      'COMFYUI_URL is not defined',
    );
  });

  it('should return not ready if there is no image in the history', async () => {
    process.env.COMFYUI_URL = 'http://localhost';
    getQueueSpy.mockResolvedValue({
      queue_pending: [],
      queue_running: [],
    });
    getHistorySpy.mockResolvedValue({});
    const result = await getStatus(sampleAssetUuid, AssetType.IMAGE);
    expect(result).toEqual({
      ready: false,
      error: 'No image found for UUID 86ee4289-0b56-42ca-8f52-d6ed180ed99f',
    });
  });

  it('should return ready if there is an image in the history', async () => {
    process.env.COMFYUI_URL = 'http://localhost';
    getQueueSpy.mockResolvedValue({
      queue_pending: [],
      queue_running: [],
    });

    getHistorySpy.mockResolvedValue(sampleHistoryData);
    getAssetUrlSpy.mockReturnValue('/valid/url');
    const result = await getStatus(sampleAssetUuid, AssetType.IMAGE);
    expect(result).toEqual({ ready: true });
  });

  it('should return not ready if queue is pending on the image UUID', async () => {
    process.env.COMFYUI_URL = 'http://localhost:8188';
    getQueueSpy.mockResolvedValue({
      queue_pending: [imageQueueData],
      queue_running: [],
    });
    const result = await getStatus(sampleAssetUuid, AssetType.IMAGE);
    expect(result).toEqual(notReady);
  });

  it('should return not ready if queue is running on the image UUID', async () => {
    process.env.COMFYUI_URL = 'http://localhost:8188';
    getQueueSpy.mockResolvedValue({
      queue_pending: [],
      queue_running: [imageQueueData],
    });
    const result = await getStatus(sampleAssetUuid, AssetType.IMAGE);
    expect(result).toEqual(notReady);
  });
});
