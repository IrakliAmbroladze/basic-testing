// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  const mockGet = jest.fn();
  const mockAxiosInstance = {
    get: mockGet,
  } as unknown as ReturnType<typeof axios.create>;

  beforeEach(() => {
    jest.clearAllMocks();

    mockedAxios.create.mockReturnValue(mockAxiosInstance);

    // Setup default mock response
    mockGet.mockResolvedValue({
      data: { id: 1, title: 'Test Data' },
    });
  });

  test('should create instance with provided base url', async () => {
    // Write your test here
    const relativePath = '/posts/1';

    await throttledGetDataFromApi(relativePath);

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    // Write your test here
    const relativePath = '/posts/1';

    await throttledGetDataFromApi(relativePath);

    expect(mockGet).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    // Write your test here
    const relativePath = '/users/1';
    const mockData = { id: 1, name: 'John Doe', email: 'john@example.com' };

    mockGet.mockResolvedValue({
      data: mockData,
    });

    const result = await throttledGetDataFromApi(relativePath);

    expect(result).toEqual(mockData);
  });
});
