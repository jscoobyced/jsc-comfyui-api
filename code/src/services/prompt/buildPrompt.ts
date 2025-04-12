import {
  WorkflowData,
  WorkflowIndex,
  WorkflowInput,
  WorkflowNames,
  WorkflowRequest,
  WorkflowType,
} from '../../models/workflow';
import { getWorkflowData } from '../../workflows/comfyuiFactory';

export const buildPrompt = (workflowInput: WorkflowInput): WorkflowRequest => {
  const workflow: WorkflowData = getWorkflowData(
    WorkflowNames.STABLE_DIFFUSION,
  );
  updatePromptValue(
    workflow.prompt,
    workflow.indexes.prompt,
    workflowInput.prompt,
  );
  updatePromptValue(
    workflow.prompt,
    workflow.indexes.negativePrompt,
    workflowInput.negativePrompt,
  );
  updatePromptValue(workflow.prompt, workflow.indexes.seed, workflowInput.seed);
  updatePromptValue(
    workflow.prompt,
    workflow.indexes.height,
    workflowInput.height,
  );
  updatePromptValue(
    workflow.prompt,
    workflow.indexes.width,
    workflowInput.width,
  );
  return { prompt: workflow.prompt };
};

const updatePromptValue = (
  prompt: WorkflowType,
  index: WorkflowIndex,
  value: string | number | undefined,
) => {
  if (!value) return;
  const currentNode = prompt[index.value.toString()].inputs;
  currentNode[index.key] = value;
};
