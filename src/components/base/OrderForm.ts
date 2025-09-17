// src/components/base/OrderForm.ts
import { Component } from './Component';
import { IOrderFormData } from '../../types/types';

export class OrderForm extends Component<null> {
  constructor() {
    super('form', 'order-form');
    this.element.innerHTML = `
      <label>
        Имя:<br/>
        <input type="text" name="name" required />
      </label><br/>
      <label>
        Email:<br/>
        <input type="email" name="email" required />
      </label><br/>
      <label>
        Адрес:<br/>
        <textarea name="address" required></textarea>
      </label><br/>
      <button type="submit">Оформить заказ</button>
      <div class="order-form__error" style="color:red; margin-top: 10px;"></div>
      <div class="order-form__success" style="color:green; margin-top: 10px;"></div>
    `;
  }

  // Добавляем публичный геттер для доступа к элементу
  public getElement(): HTMLElement {
    return this.element;
  }

  render(): HTMLElement {
    return this.element;
  }

  update(): void {
    (this.element.querySelector('input[name="name"]') as HTMLInputElement).value = '';
    (this.element.querySelector('input[name="email"]') as HTMLInputElement).value = '';
    (this.element.querySelector('textarea[name="address"]') as HTMLTextAreaElement).value = '';
    this.setError('');
    this.setSuccess('');
  }

  getFormData(): IOrderFormData {
    return {
      name: (this.element.querySelector('input[name="name"]') as HTMLInputElement).value,
      email: (this.element.querySelector('input[name="email"]') as HTMLInputElement).value,
      address: (this.element.querySelector('textarea[name="address"]') as HTMLTextAreaElement).value,
    };
  }

  setError(message: string) {
    const errorDiv = this.element.querySelector('.order-form__error') as HTMLElement;
    errorDiv.textContent = message;
  }

  setSuccess(message: string) {
    const successDiv = this.element.querySelector('.order-form__success') as HTMLElement;
    successDiv.textContent = message;
  }
}