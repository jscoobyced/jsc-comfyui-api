import { WorkflowInput, WorkflowNames } from '../../models/workflow';
import { buildPrompt } from './buildPrompt';

const expectedOutput = {
  text: 'A beautiful landscape with mountains and a river',
};

const expectedIndex = 0;

jest.mock('../../workflows/comfyuiFactory', () => {
  return {
    getWorkflowData: jest.fn((name: WorkflowNames) => ({
      prompt: {
        '0': {
          inputs: expectedOutput,
          name,
        },
      },
      indexes: {
        prompt: expectedIndex,
      },
    })),
  };
});

describe('buildPrompt', () => {
  it('should set the prompt text correctly', () => {
    const workflowInput: WorkflowInput = {
      prompt: 'A beautiful landscape with mountains and a river',
      negativePrompt: '',
      seed: 12345,
      width: 512,
      height: 512,
    };
    const result = buildPrompt(workflowInput);
    expect(result.prompt[expectedIndex.toString()].inputs).toEqual(
      expectedOutput,
    );
  });
});
