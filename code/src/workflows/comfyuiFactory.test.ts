import { WorkflowNames } from '../models/workflow';
import { getWorkflowData } from './comfyuiFactory';
import * as expected from './stable-diffusion/workflow.json';

describe('comfyuiFactory', () => {
  it('should return the correct workflow data', () => {
    const actual = getWorkflowData(WorkflowNames.STABLE_DIFFUSION).prompt;
    expect(actual).toEqual(expected);
  });

  it('should throw an error for unknown workflow names', () => {
    try {
      getWorkflowData('unknown' as WorkflowNames);
    } catch (e) {
      expect((e as Error).message).toBe('Unknown workflow name: unknown');
    }
  });
});
