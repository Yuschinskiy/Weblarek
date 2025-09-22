//src/api/FetchApi.ts
import { IApi, ApiPostMethods } from '../types/index';

export class FetchApi implements IApi {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private buildUrl(url: string): string {
    if (this.baseUrl.endsWith('/') && url.startsWith('/')) {
      return this.baseUrl + url.slice(1);
    }
    if (!this.baseUrl.endsWith('/') && !url.startsWith('/')) {
      return this.baseUrl + '/' + url;
    }
    return this.baseUrl + url;
  }

  async get<T>(url: string): Promise<T> {
    const fullUrl = this.buildUrl(url);
    console.log('Fetch GET:', fullUrl);
    try {
      const response = await fetch(fullUrl);
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      return response.json() as Promise<T>;
    } catch (error) {
      console.error('Fetch GET error:', error);
      throw error;
    }
  }

  async post<T>(url: string, data: unknown, method: ApiPostMethods): Promise<T> {
    const fullUrl = this.buildUrl(url);
    console.log('Fetch POST:', fullUrl);
    try {
      const response = await fetch(fullUrl, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      return response.json() as Promise<T>;
    } catch (error) {
      console.error('Fetch POST error:', error);
      throw error;
    }
  }
}
