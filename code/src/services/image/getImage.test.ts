import { sampleHistoryData, sampleImageUuid } from '../../models/history';
import { QueueData } from '../../models/queue';
import * as downloadImage from './downloadImage';
import * as getHistory from './getHistory';
import { getImage } from './getImage';
import * as getImageUrl from './getImageUrl';
import * as getQueue from './getQueue';

jest.mock('../utils/log');

const getQueueSpy = jest.spyOn(getQueue, 'getQueue');
const getHistorySpy = jest.spyOn(getHistory, 'getHistory');
const getImageUrlSpy = jest.spyOn(getImageUrl, 'getImageUrl');
const downloadImageSpy = jest.spyOn(downloadImage, 'downloadImage');

const imageQueueData: QueueData = [1, sampleImageUuid];

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
    const result = await getImage(sampleImageUuid);
    expect(result).toEqual(false);
  });

  it('should return ready if there is an image in the history', async () => {
    process.env.COMFYUI_URL = 'http://localhost';
    getQueueSpy.mockResolvedValue({
      queue_pending: [],
      queue_running: [],
    });

    getHistorySpy.mockResolvedValue(sampleHistoryData);
    getImageUrlSpy.mockReturnValue('/valid/url');
    downloadImageSpy.mockResolvedValue(new ArrayBuffer());
    const result = await getImage(sampleImageUuid);
    expect(result).toEqual(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      expect.any(ArrayBuffer),
    );
  });

  it('should return not ready if queue is pending on the image UUID', async () => {
    process.env.COMFYUI_URL = 'http://localhost:8188';
    getQueueSpy.mockResolvedValue({
      queue_pending: [imageQueueData],
      queue_running: [],
    });
    const result = await getImage(sampleImageUuid);
    expect(result).toEqual(false);
  });

  it('should return not ready if queue is pending on the image UUID', async () => {
    process.env.COMFYUI_URL = 'http://localhost:8188';
    getQueueSpy.mockResolvedValue({
      queue_pending: [],
      queue_running: [imageQueueData],
    });
    const result = await getImage(sampleImageUuid);
    expect(result).toEqual(false);
  });
});
