import { sampleHistoryData } from '../../models/history';
import { getHistory } from './getHistory';

describe('getHistory', () => {
  const comfyuiUrl = 'http://loaclhost:8188';
  const imageUuid = '1234-5678-90ab-cdef';

  it('should return throw an error if the fetch fails', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          ok: false,
          text: () => Promise.resolve('error'),
        }),
      ) as jest.Mock,
    );
    await expect(getHistory(comfyuiUrl, imageUuid)).rejects.toThrow(
      'Failed to get history',
    );
  });

  it('should return history data', async () => {
    const expected = sampleHistoryData;
    jest.spyOn(global, 'fetch').mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(expected),
        }),
      ) as jest.Mock,
    );
    const result = await getHistory(comfyuiUrl, imageUuid);
    expect(result).toEqual(expected);
  });
});
