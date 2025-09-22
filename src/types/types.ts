// src/types/types.ts
export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export interface IOrderFormData {
  name: string;
  email: string;
  address: string;
}

export interface IOrder {
  id: string;
  date: string;
  status: string;
  // другие поля заказа
}

export interface IOrderData {
  productList: IProduct[];
  order: IOrder;
  addProduct(item: IProduct): void;
  deleteProduct(idProduct: string): void;
  getTotal(): number;
}

export interface IProductData {
  setProductList(items: IProduct[]): void;
  getProductList(): IProduct[];
  getProductById(id: string): IProduct;
}

export interface IApiListResponse<T> {
  total: number;
  items: T[];
}