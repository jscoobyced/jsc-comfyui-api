export enum Routes {
  HOME = '/',
  IMAGE = '/image',
  IMAGE_CREATE = `/image/create`,
  IMAGE_STATUS = '/image/status/:id',
  IMAGE_GET = `/image/get/:id`,
  VIDEO = '/video',
  VIDEO_GET = `/video/get/:id`,
}

export enum ComfyUIEndpoints {
  PROMPT = 'prompt',
  QUEUE = 'queue',
  HISTORY = 'history',
}
