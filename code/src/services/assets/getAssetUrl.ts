import { AssetType } from '../../models/asset';
import { HistoryData, HistoryRecord } from '../../models/history';
import { log } from '../utils/log';

export const getAssetUrl = (
  historyData: HistoryData,
  assetUuid: string,
  assetType: AssetType,
): string => {
  if (Object.keys(historyData).length === 0) {
    return '';
  }
  const validHistoryData = historyData as Record<string, HistoryRecord>;
  for (const responseImageUuid in validHistoryData) {
    if (assetUuid === responseImageUuid) {
      const data: HistoryRecord = validHistoryData[assetUuid];
      const output = data.outputs;
      for (const key in output) {
        if (assetType === AssetType.IMAGE && 'images' in output[key]) {
        const images = output[key].images;
        for (const image of images) {
          const filename = encodeURIComponent(image.filename);
          const subfolder = image.subFolder
            ? encodeURIComponent(image.subFolder)
            : '';
          const type = image.type ? encodeURIComponent(image.type) : '';
          const path = `/api/view?filename=${filename}&subfolder=${subfolder}&type=${type}`;
          log(`Found asset ${path} for UUID ${assetUuid}`);
          return path;
        }
      } else if (assetType === AssetType.VIDEO && 'gifs' in output[key]) {
        const gifs = output[key].gifs;
        for (const gif of gifs) {
          const filename = encodeURIComponent(gif.filename);
          const subfolder = gif.subFolder ? encodeURIComponent(gif.subFolder) : '';
          const type = gif.type ? encodeURIComponent(gif.type) : '';
          const path = `/api/view?filename=${filename}&subfolder=${subfolder}&type=${type}`;
          log(`Found asset ${path} for UUID ${assetUuid}`);
          return path;
        }
      }
      }
    }
  }
  return '';
};
