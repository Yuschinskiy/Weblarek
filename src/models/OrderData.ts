// src/models/OrderData.ts
import { IOrderData, IProduct, IOrder } from '../types/types';

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
    this.productList = this.productList.filter(p => p.id !== idProduct);
  }

  getTotal(): number {
    return this.productList.reduce((sum, p) => sum + (p.price ?? 0), 0);
  }
}