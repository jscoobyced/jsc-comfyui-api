import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import { WorkflowInput } from '../models/workflow';
import { log } from '../services/log';

export const createImageRoute = (
  request: ExpressRequest,
  response: ExpressResponse,
) => {
  if (
    !(
      'prompt' in request.body &&
      'negative_prompt' in request.body &&
      'seed' in request.body &&
      'width' in request.body &&
      'height' in request.body
    )
  ) {
    log('Invalid input received.');
    response.status(400).json({
      error: `Input is not in format of WorkflowInput:{ prompt, negative_prompt, seed, width, height }`,
    });
    return;
  }
  const workflowInput: WorkflowInput = request.body as WorkflowInput;
  log('Received create image request:', JSON.stringify(workflowInput));
  response.send('');
};
