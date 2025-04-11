export interface WorkflowInput {
  prompt: string;
  negativePrompt?: string;
  seed?: number;
  width?: number;
  height?: number;
}

export interface WorkflowIndexes {
  prompt: number;
  negativePrompt: number;
  seed: number;
  width: number;
  height: number;
}

export type WorkflowType = Record<string, ClassType>;

export interface WorkflowData {
  indexes: WorkflowIndexes;
  prompt: WorkflowType;
}

export interface Meta {
  title: string;
}

export type InputsType = Record<string, object | string>;

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
  OTHER = 'other',
}
