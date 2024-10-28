import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { Fruit } from '../types/fruit';

enum HttpMethod {
  GET = 'GET',
}

interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error?: string;
}

const apiBase = 'https://proxy-fruit-project-265fff9e0ca8.herokuapp.com/proxy';

const fetchApi = async <T>(
  url: string,
  method: HttpMethod = HttpMethod.GET,
  body?: Record<string, unknown>,
  customHeaders: HeadersInit = {},
): Promise<ApiResponse<T>> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...customHeaders,
  };

  try {
    const response = await fetch(`${apiBase}${url}`, {
      method,
      headers,
      body: method !== HttpMethod.GET && body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status} at ${url}: ${response.statusText}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('API request error:', error);
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
};

export const useFruitList = (
  options?: UseQueryOptions<ApiResponse<Fruit[]>, Error>,
): UseQueryResult<ApiResponse<Fruit[]>, Error> => {
  return useQuery<ApiResponse<Fruit[]>, Error>({
    queryKey: ['fruitList'],
    queryFn: () => fetchApi<Fruit[]>(''),
    ...options,
  });
};
