import { QueueData } from '../../models/queue';
import { WorkflowType } from '../../models/workflow';
import { getImage } from './getImage';
import * as getQueue from './getQueue';

jest.mock('../utils/log');

const getQueueSpy = jest.spyOn(getQueue, 'getQueue');

const imageUuid = '94bf26c7-35da-41a5-8c7e-9e12a25078e2';
const imageQueueData: QueueData = {
  id: 1,
  uuid: imageUuid,
  object: {} as WorkflowType,
  data: {},
  array: [],
};

describe('getImage', () => {
  it('should throw an error if COMFYUI_URL is not defined', async () => {
    delete process.env.COMFYUI_URL;
    await expect(getImage('123456789')).rejects.toThrow(
      'COMFYUI_URL is not defined',
    );
  });

  it('should return ready if queue is empty', async () => {
    process.env.COMFYUI_URL = 'http://loaclhost:8188';
    getQueueSpy.mockResolvedValue({
      queue_pending: [],
      queue_running: [],
    });
    const result = await getImage(imageUuid);
    expect(result).toEqual({
      imageUrl: `http://loaclhost:8188/image/${imageUuid}`,
      ready: true,
    });
  });

  it('should return not ready if queue is pending on the image UUID', async () => {
    process.env.COMFYUI_URL = 'http://loaclhost:8188';
    getQueueSpy.mockResolvedValue({
      queue_pending: [imageQueueData],
      queue_running: [],
    });
    const result = await getImage(imageUuid);
    expect(result).toEqual({ ready: false });
  });

  it('should return not ready if queue is pending on the image UUID', async () => {
    process.env.COMFYUI_URL = 'http://loaclhost:8188';
    getQueueSpy.mockResolvedValue({
      queue_pending: [],
      queue_running: [imageQueueData],
    });
    const result = await getImage(imageUuid);
    expect(result).toEqual({ ready: false });
  });
});
