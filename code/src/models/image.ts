export interface StatusResponse {
  ready: boolean;
  error?: string;
}

export type ImageResponse = boolean | ArrayBuffer;
