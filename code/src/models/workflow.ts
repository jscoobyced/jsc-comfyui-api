export interface WorkflowInput {
  prompt: string;
  negative_prompt?: string;
  seed?: number;
  width?: number;
  height?: number;
}

export interface WorkflowIndexes {
  prompt: number;
  negative_prompt: number;
  seed: number;
  width: number;
  height: number;
}
