// src/models/ProductData.ts
import { IProduct } from '../types/types';

export class ProductData {
  private productList: IProduct[] = [];
  private preview: IProduct | null = null;

  setProductList(items: IProduct[]): void {
    this.productList = items;
  }

  getProductList(): IProduct[] {
    return this.productList;
  }

  getProductById(id: string): IProduct {
    const product = this.productList.find((item) => item.id === id);
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }
    return product;
  }

  setPreview(item: IProduct): void {
    this.preview = item;
  }

  getPreview(): IProduct | null {
    return this.preview;
  }
}

