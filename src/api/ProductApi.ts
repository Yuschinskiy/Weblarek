// src/api/ProductApi.ts
import { Api } from '../components/base/Api';
import { IProduct } from '../types/types';

export class ProductApi extends Api {
  async fetchProducts(): Promise<IProduct[]> {
    const response = await this.get<{ total: number; items: IProduct[] }>('/products');
    return response.items;
  }
}