// src/main.ts
import './scss/styles.scss';
import { EventEmitter } from './components/base/Events';
import { ProductPresenter } from './presenters/ProductPresenter';
import { BasketPresenter } from './presenters/BasketPresenter';
import { ProductApi } from './api/ProductApi';
import { OrderFormPresenter } from './presenters/OrderFormPresenter';

const API_URL = 'https://your-api.example.com'; // Заменить на реальный URL API

document.addEventListener('DOMContentLoaded', () => {
  const events = new EventEmitter();

  const productContainer = document.getElementById('product-list');
  const basketContainer = document.getElementById('basket');
  const modalContainer = document.body; // Можно создать отдельный div для модалки

  if (!productContainer || !basketContainer) {
    console.error('Не найдены контейнеры в DOM: product-list или basket');
    return;
  }

  const productApi = new ProductApi(API_URL);

  const productPresenter = new ProductPresenter(events, productContainer, modalContainer);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const basketPresenter = new BasketPresenter(events, basketContainer);

  // Асинхронная функция для загрузки товаров и их отображения
  async function loadProducts() {
    try {
      const products = await productApi.fetchProducts();
      productPresenter.loadProducts(products);
    } catch (error) {
      console.error('Ошибка загрузки товаров с API:', error);
      // Можно добавить UI-уведомление об ошибке
    }
  }
const orderFormContainer = document.getElementById('order-form');
if (!orderFormContainer) {
  console.error('Контейнер для формы заказа не найден');
  return;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const orderFormPresenter = new OrderFormPresenter(events, orderFormContainer);
basketPresenter; 
orderFormPresenter;

events.on('orderSubmitted', (data) => {
  console.log('Заказ отправлен:', data);
  // Можно показать уведомление, очистить корзину и т.п.
});

  loadProducts();
});