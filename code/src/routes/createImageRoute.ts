import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import { WorkflowInput } from '../models/workflow';
import { submitPrompt } from '../services/image/submitPrompt';
import { log } from '../services/utils/log';

export const createImageRoute = async (
  request: ExpressRequest,
  response: ExpressResponse,
) => {
  if (!('prompt' in request.body)) {
    log('Invalid input received.');
    response.status(400).json({
      error: `Input is not in format of WorkflowInput:{ prompt, negative_prompt, seed, width, height }`,
    });
    return;
  }
  const workflowInput: WorkflowInput = request.body as WorkflowInput;
  log('Received create image request');
  const result = await submitPrompt(workflowInput);
  response.status(200).json(result);
};
