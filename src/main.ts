//src/main.ts
import './scss/styles.scss';
import { EventEmitter } from './components/base/Events';
import { ProductPresenter } from './presenters/ProductPresenter';
import { BasketPresenter } from './presenters/BasketPresenter';
import { OrderFormPresenter } from './presenters/OrderFormPresenter';

import { ProductApi } from './api/ProductApi';
import { FetchApi } from './api/FetchApi';

// Получаем базовый URL API из переменной окружения VITE_API_ORIGIN
// Если переменная не задана, используем дефолтный адрес
const API_ORIGIN = import.meta.env.VITE_API_ORIGIN || 'https://larek-api.nomoreparties.co';
const API_URL = `${API_ORIGIN}/api/weblarek`;

document.addEventListener('DOMContentLoaded', () => {
  const events = new EventEmitter();

  const productContainer = document.querySelector('.gallery');
  if (!productContainer) {
    console.error('Не найден контейнер для списка продуктов (.gallery)');
    return;
  }

  const modalContent = document.querySelector('#modal-container .modal__content');
  if (!modalContent) {
    console.error('Контейнер модального окна не найден');
    return;
  }

  const basketTemplate = document.getElementById('basket') as HTMLTemplateElement | null;
  if (!basketTemplate) {
    console.error('Шаблон корзины не найден');
    return;
  }
  const basketContainer = basketTemplate.content.firstElementChild!.cloneNode(true) as HTMLElement;
  modalContent.appendChild(basketContainer);

  const orderTemplate = document.getElementById('order') as HTMLTemplateElement | null;
  if (!orderTemplate) {
    console.error('Шаблон формы заказа не найден');
    return;
  }
  const orderFormContainer = orderTemplate.content.firstElementChild!.cloneNode(true) as HTMLElement;
  modalContent.appendChild(orderFormContainer);

  // Создаем экземпляр FetchApi с базовым URL из переменной окружения
  const fetchApi = new FetchApi(API_URL);

  // Передаем объект fetchApi в ProductApi
  const productApi = new ProductApi(fetchApi);

  const productPresenter = new ProductPresenter(events, productContainer, modalContent);
  const basketPresenter = new BasketPresenter(events, basketContainer);
  const orderFormPresenter = new OrderFormPresenter(events, orderFormContainer);

  async function loadProducts() {
    try {
      const products = await productApi.fetchProducts();
      productPresenter.loadProducts(products);
    } catch (error) {
      console.error('Ошибка загрузки товаров с API:', error);
      // Можно добавить UI-уведомление об ошибке
    }
  }

  events.on('orderSubmitted', (data) => {
    console.log('Заказ отправлен:', data);
    // Можно показать уведомление, очистить корзину и т.п.
  });

  loadProducts();
});
