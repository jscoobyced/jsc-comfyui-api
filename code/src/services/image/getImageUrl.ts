import { HistoryData, HistoryRecord } from '../../models/history';
import { log } from '../utils/log';

export const getImageUrl = (
  historyData: HistoryData,
  imageUuid: string,
): string => {
  if (Object.keys(historyData).length === 0) {
    return '';
  }
  const validHistoryData = historyData as Record<string, HistoryRecord>;
  for (const responseImageUuid in validHistoryData) {
    if (imageUuid === responseImageUuid) {
      const data: HistoryRecord = validHistoryData[imageUuid];
      const output = data.outputs;
      for (const key in output) {
        const images = output[key].images;
        for (const image of images) {
          const filename = encodeURIComponent(image.filename);
          const subfolder = image.subFolder
            ? encodeURIComponent(image.subFolder)
            : '';
          const type = image.type ? encodeURIComponent(image.type) : '';
          const path = `/api/view?filename=${filename}&subfolder=${subfolder}&type=${type}`;
          log(`Found image ${path} for UUID ${imageUuid}`);
          return path;
        }
      }
    }
  }
  return '';
};
