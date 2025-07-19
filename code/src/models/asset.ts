export enum AssetType {
  IMAGE = 'image/png',
  VIDEO = 'video/mp4',
}

export interface StatusResponse {
  ready: boolean;
  error?: string;
}

export type AssetResponse = boolean | ArrayBuffer;
