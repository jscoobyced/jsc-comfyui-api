import { HistoryData } from '../../models/history';
import { ComfyUIEndpoints } from '../../models/routes';

export const getHistory = async (
  comfyuiUrl: string,
  imageUuid: string,
): Promise<HistoryData> => {
  const response = await fetch(
    `${comfyuiUrl}/${ComfyUIEndpoints.HISTORY}/${imageUuid}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  if (!response.ok) {
    throw new Error('Failed to get history');
  }
  const historyData = (await response.json()) as HistoryData;

  return historyData;
};
