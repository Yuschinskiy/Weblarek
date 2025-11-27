// /src/index.ts
import './scss/styles.scss';

import { CDN_URL, API_URL } from './utils/constants';
import { EventEmitter } from './components/base/BaseEvents';
import { AppState } from './components/appData';
import { MarketApi } from './components/apiWebLarek';
import { ContactsForm, OrderForm } from './components/order';
import { Basket } from './components/common/basket';
import { Modal } from './components/common/modal';
import { Page } from './components/page';
import { ensureElement, cloneTemplate } from './utils/utils';

// Презентеры
import { ProductPresenter } from './presenters/ProductPresenter';
import { BasketPresenter } from './presenters/BasketPresenter';
import { OrderPresenter } from './presenters/OrderPresenter';
import { ModalPresenter } from './presenters/ModalPresenter';
import { PagePresenter } from './presenters/PagePresenter';

// Инициализация
const api = new MarketApi(CDN_URL, API_URL);
const events = new EventEmitter();
const appData = new AppState({}, events);

// Шаблоны
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');

// Вью
const page = new Page(document.body, events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const orderForm = new OrderForm(cloneTemplate(orderTemplate), events);
const contactsForm = new ContactsForm(cloneTemplate(contactsTemplate), events);

// Презентеры
const modalPresenter = new ModalPresenter(events);
const productPresenter = new ProductPresenter(events, appData, page, modalPresenter);
const basketPresenter = new BasketPresenter(events, appData, basket, modalPresenter);
const orderPresenter = new OrderPresenter(events, appData, orderForm, contactsForm, modalPresenter, api);
const pagePresenter = new PagePresenter(events, appData, page);

// Отладка
events.onAll(({ eventName, data }) => console.log(eventName, data));

// Запуск
api.getProductList()
    .then((data) => appData.setCatalog(data))
    .catch(console.error);