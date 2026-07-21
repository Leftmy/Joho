export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public details?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export async function fetchWithAuth<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    credentials: 'include', // Automatically passes HTTP-Only Access & Refresh cookies
  });

  if (!response.ok) {
    let errorMessage = `HTTP Error ${response.status}`;
    let details: string | undefined;

    try {
      const errorJson = await response.json();
      errorMessage = errorJson.message || errorJson.Message || errorMessage;
      details = errorJson.details || errorJson.Details;
    } catch {
      errorMessage = await response.text();
    }

    throw new ApiError(response.status, errorMessage, details);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return {} as T;
  }

  return (await response.json()) as T;
}
