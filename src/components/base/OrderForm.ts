// src/components/base/OrderForm.ts
import { Component } from './Component';
import { IOrderFormData } from '../../types/types';

export class OrderForm extends Component<null> {
  private formElement: HTMLFormElement;

  constructor() {
    super('div', 'order-form'); // контейнер для формы

    // Находим шаблон
    const template = document.getElementById('order') as HTMLTemplateElement;
    if (!template) {
      throw new Error('Template with id="order" not found');
    }

    // Клонируем содержимое шаблона
    const content = template.content.cloneNode(true) as DocumentFragment;

    // Вставляем в контейнер
    this.element.appendChild(content);

    // Сохраняем ссылку на саму форму внутри контейнера
    this.formElement = this.element.querySelector('form[name="order"]') as HTMLFormElement;

    if (!this.formElement) {
      throw new Error('Form with name="order" not found in template');
    }
  }

  render(): HTMLElement {
    return this.element;
  }

  update(): void {
    // Очищаем поля формы
    const inputs = this.formElement.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      (input as HTMLInputElement | HTMLTextAreaElement).value = '';
    });

    this.setError('');
  }

  getFormData(): IOrderFormData {
    return {
      name: (this.formElement.querySelector('input[name="name"]') as HTMLInputElement)?.value || '',
      email: (this.formElement.querySelector('input[name="email"]') as HTMLInputElement)?.value || '',
      address: (this.formElement.querySelector('input[name="address"]') as HTMLInputElement)?.value || '',
    };
  }

  setError(message: string) {
    const errorSpan = this.formElement.querySelector('.form__errors') as HTMLElement;
    if (errorSpan) {
      errorSpan.textContent = message;
      errorSpan.style.color = 'red';
      errorSpan.style.marginTop = '10px';
    }
  }

  setSuccess(message: string) {
    // В вашем шаблоне нет отдельного блока для успеха — можно добавить или использовать alert
    alert(message);
  }

  getElement(): HTMLElement {
    return this.element;
  }
}