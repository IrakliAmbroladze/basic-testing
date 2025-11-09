// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';

jest.mock('fs');
jest.mock('fs/promises');
jest.mock('path');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.clearAllTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    // Write your test here
    const callback = jest.fn();
    const timeout = 1000;

    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);

    expect(setTimeoutSpy).toHaveBeenCalledWith(callback, timeout);

    setTimeoutSpy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    // Write your test here
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(999);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.clearAllTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    // Write your test here
    const callback = jest.fn();
    const interval = 1000;

    const setIntervalSpy = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, interval);

    expect(setIntervalSpy).toHaveBeenCalledWith(callback, interval);

    setIntervalSpy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    // Write your test here
    const callback = jest.fn();
    const interval = 1000;

    doStuffByInterval(callback, interval);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  const mockedJoin = join as jest.MockedFunction<typeof join>;
  const mockedExistsSync = existsSync as jest.MockedFunction<typeof existsSync>;
  const mockedReadFile = readFile as jest.MockedFunction<typeof readFile>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    // Write your test here
    const pathToFile = 'test.txt';

    mockedJoin.mockReturnValue('/mocked/path/test.txt');
    mockedExistsSync.mockReturnValue(false);

    await readFileAsynchronously(pathToFile);

    expect(mockedJoin).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    // Write your test here
    const pathToFile = 'nonexistent.txt';

    mockedJoin.mockReturnValue('/mocked/path/nonexistent.txt');
    mockedExistsSync.mockReturnValue(false);

    const result = await readFileAsynchronously(pathToFile);

    expect(mockedExistsSync).toHaveBeenCalledWith(
      '/mocked/path/nonexistent.txt',
    );
    expect(mockedReadFile).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    // Write your test here
    const pathToFile = 'existing.txt';
    const fileContent = 'Hello, World!';

    mockedJoin.mockReturnValue('/mocked/path/existing.txt');
    mockedExistsSync.mockReturnValue(true);
    mockedReadFile.mockResolvedValue(Buffer.from(fileContent));

    const result = await readFileAsynchronously(pathToFile);

    expect(mockedExistsSync).toHaveBeenCalledWith('/mocked/path/existing.txt');
    expect(mockedReadFile).toHaveBeenCalledWith('/mocked/path/existing.txt');
    expect(result).toBe(fileContent);
  });
});
