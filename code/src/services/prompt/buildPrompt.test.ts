import { WorkflowInput, WorkflowNames } from '../../models/workflow';
import { StableDiffusionNodes } from '../../workflows/stable-diffusion/nodes';
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
  '71': {
    inputs: {
      text: 'negative prompt text here',
      clip: ['11', 0],
    },
    class_type: 'CLIPTextEncode',
    _meta: {
      title: 'CLIP Text Encode (Negative Prompt)',
    },
  },
  '135': {
    inputs: {
      width: 1344,
      height: 1344,
      batch_size: 1,
    },
    class_type: 'EmptySD3LatentImage',
    _meta: {
      title: 'EmptySD3LatentImage',
    },
  },
  '271': {
    inputs: {
      seed: 0,
      steps: 40,
      cfg: 3,
      sampler_name: 'euler',
      scheduler: 'normal',
      denoise: 1,
      model: ['13', 0],
      positive: ['6', 0],
      negative: ['69', 0],
      latent_image: ['135', 0],
    },
  },
};

const expectedPrompt = 'A beautiful flower in a vase on a kitchen table';
const expectedIndex = StableDiffusionNodes;

jest.mock('../../workflows/comfyuiFactory', () => {
  return {
    getWorkflowData: jest.fn((name: WorkflowNames) => ({
      prompt: testWorkflow,
      indexes: expectedIndex,
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
    expect(result.prompt[expectedIndex.prompt.value.toString()].inputs).toEqual(
      {
        clip: ['11', 0],
        text: expectedPrompt,
      },
    );
    const negativePrompt = (
      expectedIndex.negativePrompt ?? { value: '' }
    ).value.toString();
    expect(result.prompt[negativePrompt].inputs).toEqual({
      clip: ['11', 0],
      text: 'negative prompt text here',
    });
    expect(result.prompt[expectedIndex.width.value.toString()].inputs).toEqual({
      width: 512,
      height: 512,
      batch_size: 1,
    });
    expect(result.prompt[expectedIndex.height.value.toString()].inputs).toEqual(
      {
        width: 512,
        height: 512,
        batch_size: 1,
      },
    );
    expect(result.prompt[expectedIndex.seed.value.toString()].inputs).toEqual({
      seed: 12345,
      steps: 40,
      cfg: 3,
      sampler_name: 'euler',
      scheduler: 'normal',
      denoise: 1,
      model: ['13', 0],
      positive: ['6', 0],
      negative: ['69', 0],
      latent_image: ['135', 0],
    });
  });
});
