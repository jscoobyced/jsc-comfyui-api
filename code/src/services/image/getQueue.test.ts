import { getQueue } from './getQueue';

describe('getQueue', () => {
  const comfyuiUrl = 'http://loaclhost:8188';

  it('should return throw an error if the fetch fails', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          ok: false,
          text: () => Promise.resolve('error'),
        }),
      ) as jest.Mock,
    );
    await expect(getQueue(comfyuiUrl)).rejects.toThrow('Failed to get queue');
  });

  it('should return queue data', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              queue_pending: [],
              queue_running: [],
            }),
        }),
      ) as jest.Mock,
    );
    const result = await getQueue(comfyuiUrl);
    expect(result).toEqual({
      queue_pending: [],
      queue_running: [],
    });
  });
});
