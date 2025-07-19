import { QueueResponse } from '../../models/queue';
import { ComfyUIEndpoints } from '../../models/routes';

export const getQueue = async (comfyuiUrl: string): Promise<QueueResponse> => {
  const response = await fetch(`${comfyuiUrl}/${ComfyUIEndpoints.QUEUE}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to get queue');
  }
  const data = (await response.json()) as QueueResponse;
  return data;
};
