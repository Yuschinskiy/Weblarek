// src/api/ProductApi.ts
import { IApi } from '../types/index';
import { IProduct, IOrderFormData } from '../types/types';

export class ProductApi {
  private api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  // Получить список товаров с сервера
  async fetchProducts(): Promise<IProduct[]> {
    const response = await this.api.get<{ total: number; items: IProduct[] }>('/product/');
    return response.items;
  }

  // Отправить заказ на сервер
  async sendOrder(orderData: { customer: IOrderFormData; products: IProduct[] }): Promise<void> {
    await this.api.post('/order/', orderData, 'POST');
  }
}