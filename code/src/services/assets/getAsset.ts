import { ImageResponse } from '../../models/image';
import { log } from '../utils/log';
import { downloadAsset } from './downloadAsset';
import { getHistory } from './getHistory';
import { getAssetUrl } from './getAssetUrl';

export const getAsset = async (assetUUID: string): Promise<ImageResponse> => {
  const comfyuiUrl = process.env.COMFYUI_URL ?? undefined;
  if (!comfyuiUrl) {
    throw new Error('COMFYUI_URL is not defined');
  }
  const historyResult = await getHistory(comfyuiUrl, assetUUID);
  const assetUrl = getAssetUrl(historyResult, assetUUID);
  if (!assetUrl) {
    log(`No image found for UUID ${assetUUID}`);
    return false;
  }
  const fullAssetUrl = `${comfyuiUrl}${assetUrl}`;
  log(`Downloading image from ${fullAssetUrl}...`);
  const assetBuffer: ArrayBuffer = await downloadAsset(fullAssetUrl);
  return assetBuffer;
};
