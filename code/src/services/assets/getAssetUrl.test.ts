import { HistoryImages, HistoryVideos, sampleHistoryData, sampleAssetUuid } from '../../models/history';
import { getAssetUrl } from './getAssetUrl';
import { AssetType } from '../../models/asset';

jest.mock('../utils/log');

describe('getAssetUrl', () => {
  it('should return the correct image URL when historyData contains valid data', () => {
    const result = getAssetUrl(
      sampleHistoryData,
      '86ee4289-0b56-42ca-8f52-d6ed180ed99f',
      AssetType.IMAGE,
    );
    expect(result).toBe('/api/view?filename=filename.png&subfolder=&type=temp');
  });

  it('should return the correct image URL when historyData contains valid data and a folder', () => {
    const historyData = sampleHistoryData;
    const images = historyData[sampleAssetUuid].outputs['123'] as HistoryImages;
    images.images[0].subFolder = 'folder';
    images.images[0].type = '';
    const result = getAssetUrl(
      historyData,
      '86ee4289-0b56-42ca-8f52-d6ed180ed99f',
      AssetType.IMAGE,
    );
    expect(result).toBe(
      '/api/view?filename=filename.png&subfolder=folder&type=',
    );
  });

  it('should return the correct video URL when historyData contains valid data', () => {
    const result = getAssetUrl(
      sampleHistoryData,
      '86ee4289-0b56-42ca-8f52-d6ed180ed99f',
      AssetType.VIDEO,
    );
    expect(result).toBe('/api/view?filename=filename.mp4&subfolder=&type=temp');
  });


  it('should return the correct video URL when historyData contains valid data and a folder', () => {
    const historyData = sampleHistoryData;
    const gifs = historyData[sampleAssetUuid].outputs['123'] as HistoryVideos;
    gifs.gifs[0].subFolder = 'folder';
    gifs.gifs[0].type = '';
    const result = getAssetUrl(
      historyData,
      '86ee4289-0b56-42ca-8f52-d6ed180ed99f',
      AssetType.VIDEO,
    );
    expect(result).toBe(
      '/api/view?filename=filename.mp4&subfolder=folder&type=',
    );
  });

  it('should return no image URL when historyData contains invlaid UUID', () => {
    const result = getAssetUrl(
      sampleHistoryData,
      '86ee4289-0b56-42ca-8f52-d6ed180ed99e',
      AssetType.IMAGE,
    );
    expect(result).toBe('');
  });
});
