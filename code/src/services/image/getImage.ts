import { ImageResponse } from '../../models/image';
import { QueueData } from '../../models/queue';
import { log } from '../utils/log';
import { getQueue } from './getQueue';

const checkQueue = (imageUUID: string, queueData: QueueData[]) => {
  for (const item of queueData) {
    if (item.uuid === imageUUID) {
      return true;
    }
  }
  return false;
};

export const getImage = async (imageUUID: string): Promise<ImageResponse> => {
  const comfyuiUrl = process.env.COMFYUI_URL ?? undefined;
  if (!comfyuiUrl) {
    throw new Error('COMFYUI_URL is not defined');
  }
  const queue = await getQueue(comfyuiUrl);
  if (
    checkQueue(imageUUID, queue.queue_pending) ||
    checkQueue(imageUUID, queue.queue_running)
  ) {
    log(`Image '${imageUUID}' is still in the queue, waiting...`);
    return { ready: false };
  }
  return { ready: true, imageUrl: `${comfyuiUrl}/image/${imageUUID}` };
};
