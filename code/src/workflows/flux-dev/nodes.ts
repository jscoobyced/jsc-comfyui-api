import { WorkflowIndexes } from '../../models/workflow';

export const FluxDevNodes: WorkflowIndexes = {
  prompt: {
    key: 'text',
    value: 6,
  },
  negativePrompt: {
    key: 'text',
    value: 7,
  },
  seed: {
    key: 'seed',
    value: 3,
  },
  width: {
    key: 'width',
    value: 5,
  },
  height: {
    key: 'height',
    value: 5,
  },
};
