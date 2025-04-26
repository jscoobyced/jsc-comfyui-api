import { StatusResponse } from '../../models/image';
import { QueueData } from '../../models/queue';
import { log } from '../utils/log';
import { getHistory } from './getHistory';
import { getImageUrl } from './getImageUrl';
import { getQueue } from './getQueue';

const checkQueue = (imageUUID: string, queueData: QueueData[]) => {
  for (const item of queueData) {
    for (const key in item) {
      if (typeof item[key] === 'string') {
        return item[key] === imageUUID;
      }
    }
  }
  return false;
};

export const getStatus = async (imageUUID: string): Promise<StatusResponse> => {
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
  const historyResult = await getHistory(comfyuiUrl, imageUUID);
  const imageUrl = getImageUrl(historyResult, imageUUID);
  if (!imageUrl) {
    const error = `No image found for UUID ${imageUUID}`;
    log(error);
    return { ready: false, error };
  }
  return { ready: true };
};
