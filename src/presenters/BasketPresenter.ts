// src/presenters/BasketPresenter.ts
import { IEvents } from '../components/base/Events';
import { IProduct } from '../types/types';
import { Basket } from '../components/base/Basket';

export class BasketPresenter {
  private basketComponent: Basket;
  private basketItems: IProduct[] = [];
  private events: IEvents;
  private container: HTMLElement;

  constructor(events: IEvents, container: HTMLElement) {
    this.events = events;
    this.container = container;

    this.basketComponent = new Basket((id: string) => {
  events.emit(id);
});
    this.container.appendChild(this.basketComponent.render());

    this.events.on('addToCart', this.onAddToCart.bind(this));
    this.events.on('removeFromCart', this.handleRemoveItem.bind(this));
    this.events.on('orderUpdated', this.renderBasket.bind(this));
  }

  private onAddToCart(product: IProduct) {
    this.basketItems.push(product);
    this.events.emit('orderUpdated', this.basketItems);
  }

  private handleRemoveItem(productId: string) {
    this.basketItems = this.basketItems.filter(item => item.id !== productId);
    this.events.emit('orderUpdated', this.basketItems);
  }

  private renderBasket(items: IProduct[]) {
    this.basketComponent.update(items);
  }
}
