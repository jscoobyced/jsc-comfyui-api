import { WorkflowIndexes } from '../../models/workflow';

export const StableDiffusionNodes: WorkflowIndexes = {
  prompt: {
    key: 'text',
    value: 16,
  },
  negativePrompt: {
    key: 'text',
    value: 40,
  },
  seed: {
    key: 'seed',
    value: 3,
  },
  width: {
    key: 'width',
    value: 53,
  },
  height: {
    key: 'height',
    value: 53,
  },
};
