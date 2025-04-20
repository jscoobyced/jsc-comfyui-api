import { WorkflowNames } from '../models/workflow';
import { getWorkflowData } from './comfyuiFactory';
import fluxExpected from './flux/workflow.json';
import sdExpected from './stable-diffusion/workflow.json';

describe('comfyuiFactory', () => {
  it('should return the correct SD workflow data', () => {
    const actual = getWorkflowData(WorkflowNames.STABLE_DIFFUSION).prompt;
    expect(actual).toEqual(sdExpected);
  });

  it('should return the correct Flux workflow data', () => {
    const actual = getWorkflowData(WorkflowNames.FLUX).prompt;
    expect(actual).toEqual(fluxExpected);
  });

  it('should throw an error for unknown workflow names', () => {
    try {
      getWorkflowData('unknown' as WorkflowNames);
    } catch (e) {
      expect((e as Error).message).toBe('Unknown workflow name: unknown');
    }
  });
});
