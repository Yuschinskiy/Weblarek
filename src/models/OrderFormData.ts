// src/models/OrderFormData.ts
import { IEvents } from '../components/base/Events';

export interface IOrderFormData {
  name: string;
  email: string;
  address: string;
  phone: string;
  paymentMethod: string;
}

export class OrderFormData {
  private data: IOrderFormData = {
    name: '',
    email: '',
    address: '',
    phone: '',
    paymentMethod: '',
  };
  private events: IEvents;

  constructor(events: IEvents) {
    this.events = events;
  }

  setData(data: Partial<IOrderFormData>) {
    this.data = { ...this.data, ...data };
  }

  validate(): boolean {
    const errors: Record<string, string> = {};

    if (!this.data.name.trim()) {
      errors.name = 'Имя обязательно';
    }

    if (!this.data.email.trim() || !this.data.email.includes('@')) {
      errors.email = 'Неверный email';
    }

    if (!this.data.address.trim()) {
      errors.address = 'Адрес обязателен';
    }

    if (!this.data.phone.trim()) {
      errors.phone = 'Телефон обязателен';
    }

    if (!this.data.paymentMethod.trim()) {
      errors.paymentMethod = 'Выберите способ оплаты';
    }

    if (Object.keys(errors).length > 0) {
      this.events.emit('orderFormErrors', errors);
      return false;
    }

    this.events.emit('orderFormValid', this.data);
    return true;
  }

  getData(): IOrderFormData {
    return this.data;
  }

  clear() {
    this.data = {
      name: '',
      email: '',
      address: '',
      phone: '',
      paymentMethod: '',
    };
    this.events.emit('orderFormCleared');
  }
}