import { WorkflowData, WorkflowNames, WorkflowType } from '../models/workflow';
import { StableDiffusionNodes } from './stable-diffusion/nodes';
import sdWorkflow from './stable-diffusion/workflow.json';

export const getWorkflowData = (name: WorkflowNames): WorkflowData => {
  let workflow;
  let indexes;
  switch (name) {
    case WorkflowNames.STABLE_DIFFUSION:
      workflow = sdWorkflow as unknown as WorkflowType;
      indexes = StableDiffusionNodes;
      break;
    default:
      throw new Error(`Unknown workflow name: ${name}`);
  }
  return {
    prompt: workflow,
    indexes,
  };
};
