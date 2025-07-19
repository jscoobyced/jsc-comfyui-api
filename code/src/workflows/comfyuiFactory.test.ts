import { WorkflowNames } from '../models/workflow';
import { getWorkflowData } from './comfyuiFactory';
import fluxDevExpected from './flux-dev/workflow.json';
import fluxSchnellExpected from './flux-schnell/workflow.json';
import sdExpected from './stable-diffusion/workflow.json';
import wanI2VExpected from './wan-i2v/workflow.json';

describe('comfyuiFactory', () => {
  it('should return the correct SD workflow data', () => {
    const actual = getWorkflowData(WorkflowNames.STABLE_DIFFUSION).prompt;
    expect(actual).toEqual(sdExpected);
  });

  it('should return the correct Flux Devworkflow data', () => {
    const actual = getWorkflowData(WorkflowNames.FLUX_DEV).prompt;
    expect(actual).toEqual(fluxDevExpected);
  });

  it('should return the correct Flux Schnell workflow data', () => {
    const actual = getWorkflowData(WorkflowNames.FLUX_SCHNELL).prompt;
    expect(actual).toEqual(fluxSchnellExpected);
  });

  it('should return the correct Wan I2V workflow data', () => {
    const actual = getWorkflowData(WorkflowNames.WAN_I2V).prompt;
    expect(actual).toEqual(wanI2VExpected);
  });

  it('should throw an error for unknown workflow names', () => {
    try {
      getWorkflowData('unknown' as WorkflowNames);
    } catch (e) {
      expect((e as Error).message).toBe('Unknown workflow name: unknown');
    }
  });
});
