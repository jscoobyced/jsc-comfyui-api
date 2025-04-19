export interface HistoryImage {
  filename: string;
  subFolder: string;
  type: string;
}

export interface HistoryImages {
  images: HistoryImage[];
}

export interface HistoryStatus {
  status_str: string;
  completed: boolean;
  messages: object[];
}

export interface HistoryMetaData {
  node_id: string;
  display_node: string;
  parent_node: string;
  real_node_id: string;
}

export type HistoryMeta = Record<string, HistoryMetaData>;

export interface HistoryRecord {
  prompt: object;
  outputs: Record<string, HistoryImages>;
  status: HistoryStatus;
  meta: HistoryMeta;
}

export type HistoryData = Record<string, HistoryRecord>;

export const sampleImageUuid = '86ee4289-0b56-42ca-8f52-d6ed180ed99f';
export const sampleHistoryData: HistoryData = {
  '86ee4289-0b56-42ca-8f52-d6ed180ed99f': {
    outputs: {
      '123': {
        images: [
          {
            filename: 'filename.png',
            subFolder: '',
            type: 'temp',
          },
        ],
      },
    },
    prompt: {},
    status: {
      status_str: '',
      completed: true,
      messages: [],
    },
    meta: {
      '123': {
        node_id: '',
        display_node: '',
        parent_node: '',
        real_node_id: '',
      },
    },
  },
};
