import { ComfyUIEndpoints } from '../../models/routes';
import { WorkflowInput, WorkflowResponse } from '../../models/workflow';
import { buildPrompt } from '../prompt/buildPrompt';
import { log } from '../utils/log';

export const submitPrompt = async (workflowInput: WorkflowInput) => {
  const comfyuiUrl = process.env.COMFYUI_URL ?? undefined;
  if (!comfyuiUrl) {
    throw new Error('COMFYUI_URL is not defined');
  }
  const prompt = buildPrompt(workflowInput);
  const createImageUrl = `${comfyuiUrl}/${ComfyUIEndpoints.PROMPT}`;
  log('Making request to ComfyUI to generate an image at', createImageUrl);
  const result = await fetch(createImageUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(prompt),
  });
  if (!result.ok) {
    throw new Error(`Failed to create image: ${await result.text()}`);
  }
  const data = (await result.json()) as WorkflowResponse;
  log(
    'Image requested successfully. Prompt id:',
    data.prompt_id,
    ', request number:',
    data.number,
  );
  return data;
};
