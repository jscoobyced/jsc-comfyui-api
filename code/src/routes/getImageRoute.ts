import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import { getImage } from '../services/image/getImage';
import { log } from '../services/utils/log';

export const getImageRoute = async (
  request: ExpressRequest,
  response: ExpressResponse,
) => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const imageUUID = request.params?.id;
  // Check params is a UUID format
  if (
    !imageUUID ||
    !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
      imageUUID,
    )
  ) {
    const error = `Invalid UUID format: ${imageUUID}`;
    log(error);
    response.status(400).json({ error });
    return;
  }
  // Get image from ComfyUI
  const getImageResponse = await getImage(imageUUID);
  // Image not ready
  if (!getImageResponse.ready) {
    const message = `Image '${imageUUID}' is not yet ready.`;
    response.status(202).json({ message });
    return;
  }
  response.status(200).json(getImageResponse);
};
