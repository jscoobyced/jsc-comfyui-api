export interface WorkflowInput {
  prompt: string;
  negativePrompt?: string;
  seed?: number;
  width?: number;
  height?: number;
  model?: string;
}

export interface WorkflowIndex {
  key: string;
  value: number;
}

export interface WorkflowIndexes {
  prompt: WorkflowIndex;
  negativePrompt?: WorkflowIndex;
  seed: WorkflowIndex;
  width: WorkflowIndex;
  height: WorkflowIndex;
}

export type WorkflowType = Record<string, ClassType>;

export interface WorkflowData {
  indexes: WorkflowIndexes;
  prompt: WorkflowType;
}

export interface Meta {
  title: string;
}

export type InputsType = Record<string, object | string | number>;

export interface ClassType {
  inputs: InputsType;
  class_type: string;
  _meta: Meta;
}

export interface WorkflowRequest {
  prompt: WorkflowType;
}

export interface WorkflowResponse {
  prompt_id: string;
  number: number;
  node_errors: object;
}

export enum WorkflowNames {
  STABLE_DIFFUSION = 'stable-diffusion',
  FLUX_DEV = 'flux-dev',
  FLUX_SCHNELL = 'flux-schnell',
  WAN_I2V = 'wan-i2v',
  WAN_T2V = 'wan-t2v',
  OTHER = 'other',
}
