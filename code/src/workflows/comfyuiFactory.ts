import { WorkflowData, WorkflowNames, WorkflowType } from '../models/workflow';
import { FluxDevNodes } from './flux-dev/nodes';
import fluxDevWorkflow from './flux-dev/workflow.json';
import { FluxSchnellNodes } from './flux-schnell/nodes';
import fluxSchnellWorkflow from './flux-schnell/workflow.json';
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
    case WorkflowNames.FLUX_DEV:
      workflow = fluxDevWorkflow as unknown as WorkflowType;
      indexes = FluxDevNodes;
      break;
    case WorkflowNames.FLUX_SCHNELL:
      workflow = fluxSchnellWorkflow as unknown as WorkflowType;
      indexes = FluxSchnellNodes;
      break;
    default:
      throw new Error(`Unknown workflow name: ${name}`);
  }
  return {
    prompt: workflow,
    indexes,
  };
};
