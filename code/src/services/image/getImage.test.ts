import { sampleHistoryData } from '../../models/history';
import { QueueData } from '../../models/queue';
import * as getHistory from './getHistory';
import { getImage } from './getImage';
import * as getImageUrl from './getImageUrl';
import * as getQueue from './getQueue';

jest.mock('../utils/log');

const getQueueSpy = jest.spyOn(getQueue, 'getQueue');
const getHistorySpy = jest.spyOn(getHistory, 'getHistory');
const getImageUrlSpy = jest.spyOn(getImageUrl, 'getImageUrl');

const imageUuid = '94bf26c7-35da-41a5-8c7e-9e12a25078e2';
const imageQueueData: QueueData = [1, imageUuid];

describe('getImage', () => {
  it('should throw an error if COMFYUI_URL is not defined', async () => {
    delete process.env.COMFYUI_URL;
    await expect(getImage('123456789')).rejects.toThrow(
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
    const result = await getImage(imageUuid);
    expect(result).toEqual({
      ready: false,
    });
  });

  it('should return ready if there is an image in the history', async () => {
    process.env.COMFYUI_URL = 'http://localhost';
    getQueueSpy.mockResolvedValue({
      queue_pending: [],
      queue_running: [],
    });

    getHistorySpy.mockResolvedValue(sampleHistoryData);
    getImageUrlSpy.mockReturnValue('/valid/url');
    const result = await getImage(imageUuid);
    expect(result).toEqual({
      ready: true,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      image: expect.any(ArrayBuffer),
    });
  });

  it('should return not ready if queue is pending on the image UUID', async () => {
    process.env.COMFYUI_URL = 'http://localhost:8188';
    getQueueSpy.mockResolvedValue({
      queue_pending: [imageQueueData],
      queue_running: [],
    });
    const result = await getImage(imageUuid);
    expect(result).toEqual({ ready: false });
  });

  it('should return not ready if queue is pending on the image UUID', async () => {
    process.env.COMFYUI_URL = 'http://localhost:8188';
    getQueueSpy.mockResolvedValue({
      queue_pending: [],
      queue_running: [imageQueueData],
    });
    const result = await getImage(imageUuid);
    expect(result).toEqual({ ready: false });
  });
});
