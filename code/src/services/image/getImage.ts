import { ImageResponse } from '../../models/image';
import { log } from '../utils/log';
import { downloadImage } from './downloadImage';
import { getHistory } from './getHistory';
import { getImageUrl } from './getImageUrl';

export const getImage = async (imageUUID: string): Promise<ImageResponse> => {
  const comfyuiUrl = process.env.COMFYUI_URL ?? undefined;
  if (!comfyuiUrl) {
    throw new Error('COMFYUI_URL is not defined');
  }
  const historyResult = await getHistory(comfyuiUrl, imageUUID);
  const imageUrl = getImageUrl(historyResult, imageUUID);
  if (!imageUrl) {
    log(`No image found for UUID ${imageUUID}`);
    return false;
  }
  const fullImageUrl = `${comfyuiUrl}${imageUrl}`;
  log(`Downloading image from ${fullImageUrl}...`);
  const imageBuffer: ArrayBuffer = await downloadImage(fullImageUrl);
  return imageBuffer;
};
