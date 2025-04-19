import { log } from '../utils/log';

export const downloadImage = async (imageUrl: string): Promise<ArrayBuffer> => {
  try {
    const response = await fetch(imageUrl);
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
