import { sampleHistoryData, sampleImageUuid } from '../../models/history';
import { getImageUrl } from './getImageUrl';

jest.mock('../utils/log');

describe('getImageUrl', () => {
  it('should return the correct image URL when historyData contains valid data', () => {
    const result = getImageUrl(
      sampleHistoryData,
      '86ee4289-0b56-42ca-8f52-d6ed180ed99f',
    );
    expect(result).toBe('/api/view?filename=filename.png&subfolder=&type=temp');
  });

  it('should return the correct image URL when historyData contains valid data and a folder', () => {
    const historyData = sampleHistoryData;
    historyData[sampleImageUuid].outputs['123'].images[0].subFolder = 'folder';
    historyData[sampleImageUuid].outputs['123'].images[0].type = '';
    const result = getImageUrl(
      historyData,
      '86ee4289-0b56-42ca-8f52-d6ed180ed99f',
    );
    expect(result).toBe(
      '/api/view?filename=filename.png&subfolder=folder&type=',
    );
  });

  it('should return no image URL when historyData contains invlaid UUID', () => {
    const result = getImageUrl(
      sampleHistoryData,
      '86ee4289-0b56-42ca-8f52-d6ed180ed99e',
    );
    expect(result).toBe('');
  });
});
