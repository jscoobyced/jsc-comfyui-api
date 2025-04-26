import { sampleHistoryData, sampleImageUuid } from '../../models/history';
import * as downloadImage from './downloadImage';
import * as getHistory from './getHistory';
import { getImage } from './getImage';
import * as getImageUrl from './getImageUrl';

jest.mock('../utils/log');

const getHistorySpy = jest.spyOn(getHistory, 'getHistory');
const getImageUrlSpy = jest.spyOn(getImageUrl, 'getImageUrl');
const downloadImageSpy = jest.spyOn(downloadImage, 'downloadImage');

describe('getImage', () => {
  it('should throw an error if COMFYUI_URL is not defined', async () => {
    delete process.env.COMFYUI_URL;
    await expect(getImage('123456789')).rejects.toThrow(
      'COMFYUI_URL is not defined',
    );
  });

  it('should return not ready if there is no image in the history', async () => {
    process.env.COMFYUI_URL = 'http://localhost';
    getHistorySpy.mockResolvedValue({});
    const result = await getImage(sampleImageUuid);
    expect(result).toEqual(false);
  });

  it('should return ready if there is an image in the history', async () => {
    process.env.COMFYUI_URL = 'http://localhost';

    getHistorySpy.mockResolvedValue(sampleHistoryData);
    getImageUrlSpy.mockReturnValue('/valid/url');
    downloadImageSpy.mockResolvedValue(new ArrayBuffer());
    const result = await getImage(sampleImageUuid);
    expect(result).toEqual(expect.any(ArrayBuffer));
  });
});
