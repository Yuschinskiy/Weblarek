// src/models/OrderFormData.ts
import { IOrderFormData } from '../types/types';
import { IEvents } from '../components/base/Events';

export class OrderFormData {
  private data: IOrderFormData = { name: '', email: '', address: '' };
  private events: IEvents;

  constructor(events: IEvents) {
    this.events = events;
  }

  setData(data: Partial<IOrderFormData>) {
    this.data = { ...this.data, ...data };
  }

  validate(): boolean {
    const { name, email, address } = this.data;
    if (!name.trim()) {
      this.events.emit('orderFormError', 'Имя обязательно');
      return false;
    }
    if (!email.trim() || !email.includes('@')) {
      this.events.emit('orderFormError', 'Неверный email');
      return false;
    }
    if (!address.trim()) {
      this.events.emit('orderFormError', 'Адрес обязателен');
      return false;
    }
    this.events.emit('orderFormValid', this.data);
    return true;
  }

  getData(): IOrderFormData {
    return this.data;
  }

  clear() {
    this.data = { name: '', email: '', address: '' };
    this.events.emit('orderFormCleared');
  }
}
