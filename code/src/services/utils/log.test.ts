import { log } from './log';

const currentDateString = '2023-04-14T12:00:00';
jest.mock('./date', () => ({
  getCurrentDate: jest.fn(() => currentDateString),
}));

describe('LogService', () => {
  it('should log a message', () => {
    const mockConsole = jest.spyOn(console, 'log').mockImplementation();
    log('Hello, world!');
    expect(mockConsole).toHaveBeenCalledWith(
      `[LOG] ${currentDateString} - Hello, world!`,
    );
    mockConsole.mockRestore();
  });
});
