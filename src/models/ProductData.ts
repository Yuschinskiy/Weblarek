// src/models/ProductData.ts
import { IProduct, IProductData } from '../types/types';
import { IEvents } from '../components/base/Events';

export class ProductData implements IProductData {
  private productList: IProduct[] = [];
  private preview: IProduct | null = null;
  private events: IEvents;

  constructor(events: IEvents) {
    this.events = events;
  }

  setProductList(items: IProduct[]): void {
    this.productList = items;
    this.events.emit('productListUpdated', this.productList);
  }

  getProductList(): IProduct[] {
    return this.productList;
  }

  getProductById(id: string): IProduct {
    const product = this.productList.find(item => item.id === id);
    if (!product) {
      throw new Error(`Product with id "${id}" not found`);
    }
    return product;
  }

  setPreview(item: IProduct): void {
    this.preview = item;
    this.events.emit('productPreviewChanged', this.preview);
  }

  getPreview(): IProduct | null {
    return this.preview;
  }
}
