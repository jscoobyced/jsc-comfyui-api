import { downloadImage } from './downloadImage';

jest.mock('../utils/log');

describe('downloadImage', () => {
  it('should get an error if the URL is not valid', async () => {
    const imageUrl = 'https:';
    jest.spyOn(global, 'fetch').mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 404,
        }),
      ) as jest.Mock,
    );
    expect(async () => await downloadImage(imageUrl)).rejects.toThrow(
      'Error downloading image: 404',
    );
  });

  it('should download an image from a given URL and return its ArrayBuffer representation', async () => {
    const imageUrl = 'https:';
    const expectedArrayBuffer = new ArrayBuffer(8);
    jest.spyOn(global, 'fetch').mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          ok: true,
          arrayBuffer: () => Promise.resolve(expectedArrayBuffer),
        }),
      ) as jest.Mock,
    );

    expect(await downloadImage(imageUrl)).toEqual(expectedArrayBuffer);
  });
});
