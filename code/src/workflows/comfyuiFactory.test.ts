import { WorkflowNames } from '../models/workflow';
import barbieFluxExpected from './barbie-flux/workflow.json';
import { getWorkflowData } from './comfyuiFactory';
import fluxDevExpected from './flux-dev/workflow.json';
import fluxSchnellExpected from './flux-schnell/workflow.json';
import sdExpected from './stable-diffusion/workflow.json';
import wanI2VExpected from './wan-i2v/workflow.json';
import wanT2VExpected from './wan-t2v/workflow.json';
import womanDragonExpected from './woman-dragon/workflow.json';

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

  it('should return the correct Wan T2V workflow data', () => {
    const actual = getWorkflowData(WorkflowNames.WAN_T2V).prompt;
    expect(actual).toEqual(wanT2VExpected);
  });

  it('should return the correct Woman Dragon workflow data', () => {
    const actual = getWorkflowData(WorkflowNames.WOMAN_DRAGON).prompt;
    expect(actual).toEqual(womanDragonExpected);
  });

  it('should return the correct Barbie Flux workflow data', () => {
    const actual = getWorkflowData(WorkflowNames.BARBIE_FLUX).prompt;
    expect(actual).toEqual(barbieFluxExpected);
  });

  it('should throw an error for unknown workflow names', () => {
    try {
      getWorkflowData('unknown' as WorkflowNames);
    } catch (e) {
      expect((e as Error).message).toBe('Unknown workflow name: unknown');
    }
  });
});
