import { WorkflowInput } from '../../models/workflow';
import { createImage } from './createImage';

jest.mock('../prompt/buildPrompt');
jest.mock('../utils/log');
jest.mock('../../models/routes', () => ({
  ComfyUIEndpoints: {
    PROMPT: 'prompt',
  },
}));

describe('image/createImage', () => {
  const workflowInput: WorkflowInput = {
    prompt: 'A beautiful landscape with mountains and a river',
    negativePrompt: '',
    seed: 0,
    width: 512,
    height: 512,
  };

  it('should throw an error if COMFYUI_URL is not defined', async () => {
    delete process.env.COMFYUI_URL;
    await expect(createImage(workflowInput)).rejects.toThrow(
      'COMFYUI_URL is not defined',
    );
  });

  it('should handle fetch error gracefully', async () => {
    process.env.COMFYUI_URL = 'http';
    jest.spyOn(global, 'fetch').mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          ok: false,
          text: () => Promise.resolve('error'),
        }),
      ) as jest.Mock,
    );

    await expect(createImage(workflowInput)).rejects.toThrow(
      'Failed to create image: error',
    );
  });

  it('should handle fetch error gracefully', async () => {
    process.env.COMFYUI_URL = 'http';
    const expected = { data: 'empty' };
    jest.spyOn(global, 'fetch').mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(expected),
        }),
      ) as jest.Mock,
    );

    const result = await createImage(workflowInput);
    expect(result).toEqual(expected);
  });
});
