// src/models/OrderData.ts
import { IOrder, IOrderData, IProduct } from '../types/types';

export class OrderData implements IOrderData {
  productList: IProduct[] = [];
  order: IOrder;

  constructor(order: IOrder) {
    this.order = order;
  }

  addProduct(item: IProduct): void {
    this.productList.push(item);
  }

  deleteProduct(idProduct: string): void {
    this.productList = this.productList.filter((p) => p.id !== idProduct);
  }

  clear(): void {
    this.productList = [];
  }

  getTotal(): number {
    return this.productList.reduce((sum, p) => sum + (p.price ?? 0), 0);
  }

  getCount(): number {
    return this.productList.length;
  }

  hasProduct(id: string): boolean {
    return this.productList.some((p) => p.id === id);
  }
}