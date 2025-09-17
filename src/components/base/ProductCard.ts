// src/components/base/ProductCard.ts
import { Component } from './Component';
import { IProduct } from '../../types/types';

export class ProductCard extends Component<IProduct> {
  private onAddToCart: (product: IProduct) => void;
  private onShowDetails: (product: IProduct) => void;

  constructor(
    onAddToCart: (product: IProduct) => void,
    onShowDetails: (product: IProduct) => void
  ) {
    super('div', 'product-card');
    this.onAddToCart = onAddToCart;
    this.onShowDetails = onShowDetails;
  }

  render(): HTMLElement {
    return this.element;
  }

  update(product: IProduct): void {
    this.element.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="product-card__image" />
      <h3 class="product-card__title">${product.title}</h3>
      <p class="product-card__description">${product.description}</p>
      <p class="product-card__price">${product.price ? product.price + ' ₽' : 'Цена по запросу'}</p>
      <button class="product-card__add-to-cart">Добавить в корзину</button>
    `;

    this.element.querySelector('.product-card__add-to-cart')?.addEventListener('click', () => this.onAddToCart(product));
    this.element.querySelector('.product-card__title')?.addEventListener('click', () => this.onShowDetails(product));
  }
}