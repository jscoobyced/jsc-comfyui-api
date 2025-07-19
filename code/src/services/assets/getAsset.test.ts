import { sampleHistoryData, sampleImageUuid } from '../../models/history';
import * as downloadAsset from './downloadAsset';
import * as getHistory from './getHistory';
import { getAsset } from './getAsset';
import * as getAssetUrl from './getAssetUrl';

jest.mock('../utils/log');

const getHistorySpy = jest.spyOn(getHistory, 'getHistory');
const getAssetUrlSpy = jest.spyOn(getAssetUrl, 'getAssetUrl');
const downloadAssetSpy = jest.spyOn(downloadAsset, 'downloadAsset');

describe('getImage', () => {
  it('should throw an error if COMFYUI_URL is not defined', async () => {
    delete process.env.COMFYUI_URL;
    await expect(getAsset('123456789')).rejects.toThrow(
      'COMFYUI_URL is not defined',
    );
  });

  it('should return not ready if there is no image in the history', async () => {
    process.env.COMFYUI_URL = 'http://localhost';
    getHistorySpy.mockResolvedValue({});
    const result = await getAsset(sampleImageUuid);
    expect(result).toEqual(false);
  });

  it('should return ready if there is an image in the history', async () => {
    process.env.COMFYUI_URL = 'http://localhost';

    getHistorySpy.mockResolvedValue(sampleHistoryData);
    getAssetUrlSpy.mockReturnValue('/valid/url');
    downloadAssetSpy.mockResolvedValue(new ArrayBuffer());
    const result = await getAsset(sampleImageUuid);
    expect(result).toEqual(expect.any(ArrayBuffer));
  });
});
