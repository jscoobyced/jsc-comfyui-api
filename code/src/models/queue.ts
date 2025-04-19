import { WorkflowType } from './workflow';

export interface QueueData {
  id: number;
  uuid: string;
  object: WorkflowType;
  data: object;
  array: string[];
}

export interface QueueResponse {
  queue_running: QueueData[];
  queue_pending: QueueData[];
}
