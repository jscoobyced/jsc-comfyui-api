import { WorkflowData, WorkflowNames, WorkflowType } from '../models/workflow';
import { StableDiffusionNodes } from './stable-diffusion/nodes';
import * as sdWorkflow from './stable-diffusion/workflow.json';

export const getWorkflowData = (name: WorkflowNames): WorkflowData => {
  switch (name) {
    case WorkflowNames.STABLE_DIFFUSION:
      return {
        prompt: sdWorkflow as unknown as WorkflowType,
        indexes: StableDiffusionNodes,
      };
    default:
      throw new Error(`Unknown workflow name: ${name}`);
  }
};
