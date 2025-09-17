// src/components/base/Basket.ts
import { Component } from './Component';
import { IProduct } from '../../types/types';

export class Basket extends Component<IProduct[]> {
  private onRemoveItem: (id: string) => void;

  constructor(onRemoveItem: (id: string) => void) {
    super('div', 'basket');
    this.onRemoveItem = onRemoveItem;
  }

  render(): HTMLElement {
    return this.element;
  }

  update(items: IProduct[]): void {
    if (items.length === 0) {
      this.element.innerHTML = '<p>Корзина пуста</p>';
      return;
    }

    this.element.innerHTML = items
      .map(item => `
        <div class="basket-item" data-id="${item.id}">
          <span>${item.title} — ${item.price ? item.price + ' ₽' : 'Цена по запросу'}</span>
          <button class="basket-item__remove">Удалить</button>
        </div>
      `)
      .join('');

    // Навешиваем обработчики удалений
    this.element.querySelectorAll('.basket-item__remove').forEach(button => {
      button.addEventListener('click', () => {
        const parent = button.closest('.basket-item');
        const id = parent?.getAttribute('data-id');
        if (id) this.onRemoveItem(id);
      });
    });
  }
}