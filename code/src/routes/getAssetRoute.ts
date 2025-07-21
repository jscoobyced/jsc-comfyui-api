import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import { getAsset } from '../services/assets/getAsset';
import { log } from '../services/utils/log';
import { AssetType } from '../models/asset';

export const getAssetRoute = async (
  request: ExpressRequest,
  response: ExpressResponse,
  assetType: AssetType,
) => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const requestId = request.params?.id;
  // Trim the extension
  const assetUUID = requestId.split('.')[0];
  // Check params is a UUID format
  if (
    !assetUUID ||
    !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
      assetUUID,
    )
  ) {
    const error = `Invalid UUID format: ${assetUUID}`;
    log(error);
    response.status(400).json({ error });
    return;
  }
  // Get image from ComfyUI
  const getAssetResponse = await getAsset(assetUUID, assetType);
  // Image not ready
  if (!getAssetResponse) {
    const message = `Asset '${assetUUID}' is not yet ready.`;
    response.status(202).json({ message });
    return;
  }
  const assetBuffer = getAssetResponse as ArrayBuffer;
  response
    .status(200)
    .header('Content-Type', assetType.valueOf())
    .send(Buffer.from(assetBuffer));
};
