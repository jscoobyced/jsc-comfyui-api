import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import { getStatus } from '../services/assets/getStatus';
import { log } from '../services/utils/log';
import { AssetType } from '../models/asset';

export const getImageStatusRoute = async (
  request: ExpressRequest,
  response: ExpressResponse
) => {
  await getStatusRoute(request, response, AssetType.IMAGE)
}

export const getVideoStatusRoute = async (
  request: ExpressRequest,
  response: ExpressResponse
) => {
  await getStatusRoute(request, response, AssetType.VIDEO)
}

const getStatusRoute = async (
  request: ExpressRequest,
  response: ExpressResponse,
  assetType: AssetType
) => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const assetUUID = request.params?.id;
  // Check params is a UUID format
  if (
    !assetUUID ||
    !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
      assetUUID,
    )
  ) {
    const error = `Invalid UUID format: ${assetUUID}`;
    log(error);
    response.status(400).json({ ready: false, error });
    return;
  }
  // Get image from ComfyUI
  const getStatusResponse = await getStatus(assetUUID, assetType);
  // Image not readygetStatus
  if (!getStatusResponse.ready) {
    response.status(202).json({ ready: false });
    return;
  }
  response.status(200).json(getStatusResponse);
};
