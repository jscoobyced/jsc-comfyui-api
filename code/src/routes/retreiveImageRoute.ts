import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import { getImage } from '../services/image/getImage';
import { log } from '../services/utils/log';

export const retreiveImageRoute = async (
  request: ExpressRequest,
  response: ExpressResponse,
) => {
  // Check params is a UUID format
  if (
    !request.params?.id ||
    !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
      request.params?.id,
    )
  ) {
    const error = `Invalid UUID format: ${request.params?.id}`;
    log(error);
    response.status(400).json({ error });
    return;
  }
  const imageUUID = request.params.id;
  // Get image from ComfyUI
  const getImageResponse = await getImage(imageUUID);
  // Image not ready
  if (!getImageResponse.ready) {
    const message = `Image '${imageUUID}' is not yet ready.`;
    log(message);
    response.status(202).json({ message });
    return;
  }
  // Image is ready
  log(`Image '${imageUUID}' is ready or does not exist.`);
  response.status(200).json({ params: imageUUID });
};
