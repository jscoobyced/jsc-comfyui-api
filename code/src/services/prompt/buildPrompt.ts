import {
  WorkflowData,
  WorkflowInput,
  WorkflowNames,
  WorkflowRequest,
} from '../../models/workflow';
import { getWorkflowData } from '../../workflows/comfyuiFactory';

export const buildPrompt = (workflowInput: WorkflowInput): WorkflowRequest => {
  const workflow: WorkflowData = getWorkflowData(
    WorkflowNames.STABLE_DIFFUSION,
  );
  setPromptText(workflow, workflowInput.prompt);
  return { prompt: workflow.prompt };
};

const setPromptText = (workflow: WorkflowData, promptText: string) => {
  const promptIndex = workflow.indexes.prompt;
  const nodes = workflow.prompt[promptIndex].inputs;
  const newNode = { ...nodes, text: promptText };
  workflow.prompt[promptIndex].inputs = newNode;
};
