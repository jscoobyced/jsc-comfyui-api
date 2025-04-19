export type QueueData = Record<number, number | string | object[]>;

export interface QueueResponse {
  queue_running: QueueData[];
  queue_pending: QueueData[];
}
