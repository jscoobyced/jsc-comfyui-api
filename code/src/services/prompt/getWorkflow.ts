import { WorkflowNames } from '../../models/workflow';

export const getModel = (model: string): WorkflowNames => {
  switch (model) {
    case WorkflowNames.FLUX_DEV.valueOf():
      return WorkflowNames.FLUX_DEV;
    case WorkflowNames.FLUX_SCHNELL.valueOf():
      return WorkflowNames.FLUX_SCHNELL;
    case WorkflowNames.STABLE_DIFFUSION.valueOf():
      return WorkflowNames.STABLE_DIFFUSION;
    default:
      return WorkflowNames.FLUX_SCHNELL;
  }
};
