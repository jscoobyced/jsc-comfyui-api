import { WorkflowNames } from '../../models/workflow';
import { getModel } from './getWorkflow';

describe('getWorkflow', () => {
  it('should return the correct workflow for FLUX_DEV', () => {
    expect(getModel(WorkflowNames.FLUX_DEV)).toBe(WorkflowNames.FLUX_DEV);
  });
  it('should return the correct workflow for FLUX_SCHNELL', () => {
    expect(getModel(WorkflowNames.FLUX_SCHNELL.valueOf())).toBe(
      WorkflowNames.FLUX_SCHNELL,
    );
  });
  it('should return the correct workflow for STABLE_DIFFUSION', () => {
    expect(getModel(WorkflowNames.STABLE_DIFFUSION)).toBe(
      WorkflowNames.STABLE_DIFFUSION,
    );
  });
  it('should return the correct workflow for WAN_I2V', () => {
    expect(getModel(WorkflowNames.WAN_I2V)).toBe(WorkflowNames.WAN_I2V);
  });
  it('should return the correct workflow for WAN_T2V', () => {
    expect(getModel(WorkflowNames.WAN_T2V)).toBe(WorkflowNames.WAN_T2V);
  });
  it('should default to FLUX_SCHNELL if an unknown model is provided', () => {
    expect(getModel('unknown')).toBe(WorkflowNames.FLUX_SCHNELL);
  });
});
