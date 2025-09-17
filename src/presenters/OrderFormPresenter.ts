// src/presenters/OrderFormPresenter.ts
import { OrderFormData } from '../models/OrderFormData';  // поправил импорт, у тебя был OrderData
import { OrderForm } from '../components/base/OrderForm';
import { IEvents } from '../components/base/Events';
import { IOrderFormData } from '../types/types';

export class OrderFormPresenter {
  private orderFormData: OrderFormData;
  private orderForm: OrderForm;
  private events: IEvents;
  private container: HTMLElement;

  constructor(events: IEvents, container: HTMLElement) {
    this.events = events;
    this.container = container;

    this.orderFormData = new OrderFormData(events);
    this.orderForm = new OrderForm();

    this.container.appendChild(this.orderForm.render());

    // Используем геттер getElement() вместо прямого доступа к protected element
    this.orderForm.getElement().addEventListener('submit', this.onSubmit.bind(this));

    this.events.on('orderFormError', (msg: string) => {
      this.orderForm.setError(msg);
      this.orderForm.setSuccess('');
    });

    this.events.on('orderFormValid', (data: IOrderFormData) => {
      this.orderForm.setError('');
      this.orderForm.setSuccess('Данные валидны, заказ оформлен!');
      // Здесь можно вызвать API для отправки заказа
      this.events.emit('orderSubmitted', data);
      this.orderForm.update(); // очистить форму
      this.orderFormData.clear();
    });

    this.events.on('orderFormCleared', () => {
      this.orderForm.update();
    });
  }

  private onSubmit(event: Event) {
    event.preventDefault();
    const data = this.orderForm.getFormData();
    this.orderFormData.setData(data);
    this.orderFormData.validate();
  }
}
