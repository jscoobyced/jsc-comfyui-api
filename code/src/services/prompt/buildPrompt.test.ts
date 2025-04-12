import { WorkflowInput, WorkflowNames } from '../../models/workflow';
import { buildPrompt } from './buildPrompt';

const testWorkflow = {
  '6': {
    inputs: {
      text: 'prompt text here',
      clip: ['11', 0],
    },
    class_type: 'CLIPTextEncode',
    _meta: {
      title: 'CLIP Text Encode (Prompt)',
    },
  },
  '11': {
    inputs: {
      clip_name1: 'clip_g.safetensors',
      clip_name2: 'clip_l.safetensors',
      clip_name3: 't5xxl_fp16.safetensors',
    },
    class_type: 'TripleCLIPLoader',
    _meta: {
      title: 'TripleCLIPLoader',
    },
  },
};

const expectedPrompt = 'A beautiful flower in a vase on a kitchen table';
const expectedIndex = 6;

jest.mock('../../workflows/comfyuiFactory', () => {
  return {
    getWorkflowData: jest.fn((name: WorkflowNames) => ({
      prompt: testWorkflow,
      indexes: {
        prompt: expectedIndex,
      },
      name,
    })),
  };
});

describe('buildPrompt', () => {
  it('should set the prompt text correctly', () => {
    const workflowInput: WorkflowInput = {
      prompt: expectedPrompt,
      negativePrompt: '',
      seed: 12345,
      width: 512,
      height: 512,
    };
    const result = buildPrompt(workflowInput);
    expect(result.prompt.default).toBeUndefined();
    expect(result.prompt[expectedIndex.toString()].inputs).toEqual({
      clip: ['11', 0],
      text: expectedPrompt,
    });
  });
});
