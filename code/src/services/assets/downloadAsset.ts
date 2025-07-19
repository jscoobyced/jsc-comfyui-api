import { log } from '../utils/log';

export const downloadAsset = async (assetUrl: string): Promise<ArrayBuffer> => {
  try {
    const response = await fetch(assetUrl);
    if (!response.ok) {
      throw new Error(`Error downloading image: ${response.status.toString()}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    return arrayBuffer;
  } catch (error) {
    log(`Error downloading image:, ${JSON.stringify(error)}`);
    throw error;
  }
};
