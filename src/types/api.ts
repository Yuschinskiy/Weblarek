// src/typec/api.ts
export type ApiListResponse<Type> = {
    total: number;
    items: Type[];
};

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export class Api {
    readonly baseUrl: string;
    protected options: RequestInit;

    constructor(baseUrl: string, options: RequestInit = {}) {
        this.baseUrl = baseUrl;
        this.options = {
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers as object ?? {})
            }
        };
    }

    // Исправлено: Типизированный ответ
    protected async handleResponse<T>(response: Response): Promise<T> {
        if (response.ok) return response.json();
        const errorData = await response.json();
        throw new Error(errorData.error ?? response.statusText);
    }

    async get<T>(uri: string): Promise<T> {
        const response = await fetch(this.baseUrl + uri, {
            ...this.options,
            method: 'GET'
        });
        return this.handleResponse<T>(response);
    }

    async post<T>(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<T> {
        const response = await fetch(this.baseUrl + uri, {
            ...this.options,
            method,
            body: JSON.stringify(data)
        });
        return this.handleResponse<T>(response);
    }
}