import { WorkflowIndexes } from '../../models/workflow';

export const StableDiffusionNodes: WorkflowIndexes = {
  prompt: {
    key: 'text',
    value: 6,
  },
  negativePrompt: {
    key: 'text',
    value: 71,
  },
  seed: {
    key: 'seed',
    value: 271,
  },
  width: {
    key: 'width',
    value: 135,
  },
  height: {
    key: 'height',
    value: 135,
  },
};
