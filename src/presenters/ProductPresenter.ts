// src/presenters/ProductPresenter.ts
import { ProductData } from '../models/ProductData';
import { ProductCard } from '../components/base/ProductCard';
import { IEvents } from '../components/base/Events';
import { IProduct } from '../types/types';
import { ModalPresenter } from './ModalPresenter';

export class ProductPresenter {
  private productData: ProductData;
  private events: IEvents;
  private container: HTMLElement;
  private modalPresenter: ModalPresenter;

  constructor(events: IEvents, container: HTMLElement, modalContainer: HTMLElement) {
    this.events = events;
    this.productData = new ProductData(events);
    this.container = container;
    this.modalPresenter = new ModalPresenter(modalContainer);

    this.events.on('productListUpdated', this.renderProductList.bind(this));
  }

  loadProducts(products: IProduct[]) {
    this.productData.setProductList(products);
  }

  private handleAddToCart(product: IProduct) {
    this.events.emit('addToCart', product);
  }

  private handleShowDetails(product: IProduct) {
    const content = `
      <img src="${product.image}" alt="${product.title}" style="max-width: 100%;"/>
      <p>${product.description}</p>
      <p>Категория: ${product.category}</p>
      <p>Цена: ${product.price ? product.price + ' ₽' : 'Цена по запросу'}</p>
    `;
    this.modalPresenter.open(product.title, content);
  }

  renderProductList(products: IProduct[]) {
    this.container.innerHTML = ''; // очистить контейнер
    products.forEach(product => {
      const card = new ProductCard(this.handleAddToCart.bind(this), this.handleShowDetails.bind(this));
      card.update(product);
      this.container.appendChild(card.render());
    });
  }
}