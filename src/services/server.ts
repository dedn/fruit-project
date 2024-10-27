type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error?: string;
}

export default class ApiService {
  private _apiBase: string = import.meta.env.VITE_API_BASE_URL || '/api';

  // General method to fetch resources with dynamic method and URL
  private async request<T>(
    url: string,
    method: HttpMethod = 'GET',
    body?: Record<string, unknown>,
    customHeaders: HeadersInit = {},
  ): Promise<ApiResponse<T>> {
    try {
      // Set default headers and merge with any custom headers
      const headers: HeadersInit = Object.assign(
        {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        customHeaders,
      );

      const response = await fetch(`${this._apiBase}${url}`, {
        method,
        headers,
        body: method !== 'GET' && body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
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
  }

  // Fetching the list of fruits with appropriate typing
  async getDataList<T>(): Promise<ApiResponse<T>> {
    return await this.request<T>('');
  }

  // Additional endpoint methods
  // For example: getFruitById(id: string), addFruit(data), etc.
}
