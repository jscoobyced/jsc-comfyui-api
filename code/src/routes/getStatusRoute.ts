import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import { getStatus } from '../services/image/getStatus';
import { log } from '../services/utils/log';

export const getStatusRoute = async (
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
    response.status(400).json({ ready: false, error });
    return;
  }
  // Get image from ComfyUI
  const getStatusResponse = await getStatus(imageUUID);
  // Image not readygetStatus
  if (!getStatusResponse.ready) {
    response.status(202).json({ ready: false });
    return;
  }
  response.status(200).json(getStatusResponse);
};
