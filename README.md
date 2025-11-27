# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

# Архетиктура прокта Web-Larek

Общая структура (MVVM-like архитектура)
src/
├── components/     // Модели и компоненты представления
├── presenters/     // Презентеры (посредники между view и model)
├── utils/         // Вспомогательные утилиты
├── types/         // Типы TypeScript
└── scss/          // Стили
1. Слои архитектуры
Модели (Model Layer)
AppState (appData.ts) - центральное состояние приложения
MarketApi (apiWebLarek.ts) - работа с API
Базовые модели (BaseModel.ts, BaseEvents.ts) - основа системы событий
Представление (View Layer)
Компоненты UI (cards.ts, basket.ts, form.ts, modal.ts, page.ts)
Базовые компоненты (BaseComponents.ts) - абстракция для DOM-элементов
Презентеры (Presenter Layer)
ProductPresenter - управление каталогом товаров
BasketPresenter - управление корзиной
OrderPresenter - управление процессом заказа
ModalPresenter - управление модальными окнами
PagePresenter - управление главной страницей
2. Ключевые компоненты
Базовые классы
// Базовые строительные блоки
Component<T>          // Базовый компонент
EventEmitter          // Система событий
Model<T>              // Базовая модель
Api                   // HTTP-клиент
Основные компоненты
// UI компоненты
Cards                 // Карточка товара
Basket                // Корзина
Modal                 // Модальное окно
Page                  // Главная страница
OrderForm             // Форма заказа
ContactsForm          // Форма контактов
Презентеры
// Логика представления
ProductPresenter      // Управление товарами
BasketPresenter       // Управление корзиной  
OrderPresenter        // Управление заказом
ModalPresenter        // Управление модалками
PagePresenter         // Управление страницей
3. Поток данных
API -> MarketApi -> AppState -> Презентеры -> Компоненты -> DOM
4. Система событий
Центральная EventEmitter связывает все части приложения:

// Примеры событий
'catalog:change'     // Изменение каталога
'basket:change'      // Изменение корзины
'order:open'         // Открытие формы заказа
'modal:open'         // Открытие модального окна
'formErrors:change'  // Изменение ошибок формы
5. Типизация
Полная система типов в types/index.ts:

IProduct - данные товара
IOrder - данные заказа
IBasket - состояние корзины
И другие вспомогательные типы
6. Вспомогательные утилиты
// Утилиты работы с DOM
ensureElement()      // Гарантированное получение элемента
cloneTemplate()      // Клонирование шаблонов
createElement()      // Создание элементов

// Константы
API_URL, CDN_URL     // URL API
settings             // CSS-классы для категорий

Детализированная архитектура проекта "Web Larek"
1. Базовый слой (Base Layer)
Класс: EventEmitter (src/components/base/BaseEvents.ts)
Ответственность: Центральная система событий (брокер событий) для связи между компонентами.

// Свойства
_events: Map<EventName, Set<Subscriber>>  // Хранилище обработчиков событий

// Методы
on<T>(event: EventName, callback: (data: T) => void)     // Подписка на событие
off(eventName: EventName, callback: Subscriber)          // Отписка от события
emit<T>(eventName: string, data?: T)                     // Генерация события
onAll(callback: (event: EmitterEvent) => void)           // Подписка на все события
offAll()                                                 // Очистка всех обработчиков
trigger<T>(eventName: string, context?: Partial<T>)      // Создание триггер-функции
Класс: Component<T> (src/components/base/BaseComponents.ts)
Ответственность: Базовый класс для всех UI компонентов, предоставляет утилиты для работы с DOM.

// Свойства
protected container: HTMLElement  // Корневой DOM-элемент компонента

// Методы
toggleClass(element: HTMLElement, className: string, force?: boolean)
setText(element: HTMLElement, value: unknown)
setDisabled(element: HTMLElement, state: boolean)
setHidden(element: HTMLElement)
setVisible(element: HTMLElement)
setImage(element: HTMLImageElement, src: string, alt?: string)
render(data?: Partial<T>): HTMLElement  // Основной метод рендеринга
Класс: Api (src/components/base/BaseApi.ts)
Ответственность: Базовый HTTP-клиент для работы с API.

// Свойства
readonly baseUrl: string
protected options: RequestInit

// Методы
protected handleResponse(response: Response): Promise<object>
get(uri: string): Promise<object>
post(uri: string, data: object, method?: ApiPostMethods): Promise<object>
Класс: Model<T> (src/components/base/BaseModel.ts)
Ответственность: Базовая модель данных с поддержкой системы событий.

// Свойства
protected events: IEvents  // Ссылка на систему событий

// Методы
emitChanges(event: string, payload?: object)  // Уведомление об изменениях
2. Модели данных (Data Layer)
Класс: AppState (src/components/appData.ts)
Ответственность: Центральное состояние приложения (Store).

// Свойства
catalog: IProduct[]          // Каталог товаров
basket: IProduct[]           // Товары в корзине
order: Partial<IOrder>       // Данные заказа
preview: string | null       // ID товара для превью
formErrors: ErrorForm        // Ошибки валидации форм

// Методы
addToBasket(product: IProduct)           // Добавление в корзину
removeFromBasket(product: IProduct)      // Удаление из корзины
clearBasket()                            // Очистка корзины
updateBasket()                           // Обновление состояния корзины
getTotal(): number                       // Расчет общей суммы
setCatalog(items: IProduct[])            // Установка каталога
setPreview(product: IProduct)            // Установка товара для превью
getOrderToPost(): IOrder                 // Подготовка данных заказа
setPayment(value: string)                // Установка способа оплаты
setOrderField(field, value)              // Установка поля заказа
setContactField(field, value)            // Установка поля контактов
validContact(): boolean                  // Валидация контактов
validOrder(): boolean                    // Валидация заказа
resetOrder()                             // Сброс данных заказа
resetContact()                           // Сброс данных контактов
Показать все
Класс: MarketApi (src/components/apiWebLarek.ts)
Ответственность: Специализированный API-клиент для работы с магазином.

// Свойства
readonly cdn: string  // URL CDN для изображений

// Методы
private normalizeProduct(item: IProduct): IProduct  // Нормализация данных товара
getProductList(): Promise<IProduct[]>               // Получение каталога товаров
order(order: IOrder): Promise<IOrderResult>        // Отправка заказа
3. Компоненты UI (UI Components)
Класс: Cards (src/components/cards.ts)
Ответственность: Отображение карточки товара (каталог/корзина/превью).

// Свойства
protected idIdeficationElement?: HTMLElement
protected titleElement: HTMLElement
protected descriptionElement?: HTMLElement
protected imageElement: HTMLImageElement
protected category: HTMLElement
protected price: HTMLElement
protected button?: HTMLButtonElement

// Методы
set id(value: string)                     // Установка ID
set identifierCard(value: string)         // Установка идентификатора
set title(value: string)                  // Установка заголовка
set description(value: string)            // Установка описания
set image(value: string)                  // Установка изображения
set priceElement(value: number)           // Установка цены
set categoryElement(value: string)        // Установка категории
setButtonText(text: string)               // Установка текста кнопки
set buttonState(price: number)            // Установка состояния кнопки
Класс: Basket (src/components/common/basket.ts)
Ответственность: Отображение и управление корзиной товаров.

// Свойства
protected _list: HTMLElement        // Контейнер списка товаров
protected _price: HTMLElement       // Элемент общей суммы
protected _button: HTMLButtonElement // Кнопка оформления заказа

// Методы
set items(items: HTMLElement[])     // Установка элементов корзины
set selected(value: boolean)        // Установка состояния выбора
set priceTotal(price: number)       // Установка общей суммы
Класс: Form<T> (src/components/common/form.ts)
Ответственность: Базовая форма с валидацией.

// Свойства
protected _submit: HTMLButtonElement  // Кнопка отправки
protected _errors: HTMLElement        // Контейнер ошибок

// Методы
protected onInputChange(field: keyof T, value: string)  // Обработка изменения поля
set valid(value: boolean)              // Установка валидности формы
set errors(value: string)              // Установка ошибок
Класс: OrderForm (src/components/order.ts)
Ответственность: Форма оформления заказа (адрес и способ оплаты).

// Свойства
private _paymentButtons: HTMLButtonElement[]  // Кнопки способов оплаты

// Методы
set address(value: string)            // Установка адреса
set payment(name: string)             // Установка способа оплаты
clearPayment()                        // Очистка выбора оплаты
Класс: ContactsForm (src/components/order.ts)
Ответственность: Форма контактных данных.

// Методы
set phone(value: string)              // Установка телефона
set email(value: string)              // Установка email
Класс: Modal (src/components/common/modal.ts)
Ответственность: Управление модальными окнами.

// Свойства
protected _closeButton: HTMLButtonElement  // Кнопка закрытия
protected _content: HTMLElement            // Контейнер содержимого

// Методы
private handleClose()                      // Обработка закрытия
set content(value: HTMLElement)           // Установка содержимого
open()                                    // Открытие модального окна
close()                                   // Закрытие модального окна
Класс: Page (src/components/page.ts)
Ответственность: Управление главной страницей.

// Свойства
protected _counter: HTMLElement    // Счетчик корзины
protected _catalog: HTMLElement    // Контейнер каталога
protected _wrapper: HTMLElement    // Основной контейнер
protected _basket: HTMLElement     // Кнопка корзины

// Методы
set counter(value: number)         // Установка счетчика
set catalog(items: HTMLElement[])  // Установка каталога
set locked(value: boolean)         // Блокировка страницы
4. Презентеры (Presenters Layer)
Класс: ProductPresenter (src/presenters/ProductPresenter.ts)
Ответственность: Управление отображением каталога товаров и превью.

// Свойства
private cardCatalogTemplate: HTMLTemplateElement
private cardPreviewTemplate: HTMLTemplateElement

// Методы
private bindEvents()               // Привязка обработчиков событий
private updateCatalog()            // Обновление каталога товаров
private showProductPreview(item: IProduct)  // Показ превью товара
Класс: BasketPresenter (src/presenters/BasketPresenter.ts)
Ответственность: Управление корзиной товаров.

// Свойства
private basketTemplate: HTMLTemplateElement
private cardBasketTemplate: HTMLTemplateElement

// Методы
private bindEvents()               // Привязка обработчиков событий
private updateBasketView()         // Обновление вида корзины
private openBasket()               // Открытие корзины
Класс: OrderPresenter (src/presenters/OrderPresenter.ts)
Ответственность: Управление процессом оформления заказа.

// Свойства
private orderTemplate: HTMLTemplateElement
private contactsTemplate: HTMLTemplateElement
private successTemplate: HTMLTemplateElement

// Методы
private bindEvents()               // Привязка обработчиков событий
private openOrderForm()            // Открытие формы заказа
private openContactsForm()         // Открытие формы контактов
private updateFormValidation(errors: Partial<IOrder>)  // Обновление валидации
private submitOrder()              // Отправка заказа
private submitContacts()           // Отправка контактов
Класс: ModalPresenter (src/presenters/ModalPresenter.ts)
Ответственность: Управление модальными окнами.

// Свойства
private modal: Modal

// Методы
openModal(content: HTMLElement)    // Открытие модального окна
closeModal()                       // Закрытие модального окна
Класс: PagePresenter (src/presenters/PagePresenter.ts)
Ответственность: Управление состоянием главной страницы.

// Методы
private bindEvents()               // Привязка обработчиков событий
5. Вспомогательные утилиты (Utils)
Функции в src/utils/utils.ts
// Работа с DOM
ensureElement<T>()          // Гарантированное получение элемента
ensureAllElements<T>()      // Гарантированное получение всех элементов
cloneTemplate()             // Клонирование шаблона
createElement()             // Создание элемента
setElementData()            // Установка dataset атрибутов
getElementData()            // Получение dataset атрибутов

// Вспомогательные
pascalToKebab()             // Преобразование PascalCase в kebab-case
isSelector()                // Проверка является ли строкой селектором
isEmpty()                   // Проверка на пустое значение
isPlainObject()             // Проверка на простой объект
isBoolean()                 // Проверка на boolean
bem()                       // Генератор BEM классов
Константы в src/utils/constants.ts
API_URL, CDN_URL           // Базовые URL
settings                   // CSS классы для категорий товаров
pay                        // Соответствие способов оплаты
6. Типы данных (Types)
Интерфейсы в src/types/index.ts
IProduct          // Данные товара
IBasket           // Состояние корзины
IDelivery         // Данные доставки
IContact          // Контактные данные
IOrder            // Полные данные заказа
IOrderResult      // Результат оформления заказа
ISuccsess         // Данные успешного заказа
IApiStatus        // Состояние приложения
ApiListResponse   // Ответ API для списков
ErrorForm         // Ошибки валидации форм
7. Входная точка (Entry Point)
Файл: src/index.ts
Ответственность: Инициализация приложения, связывание всех компонентов.

// Инициализация
const api = new MarketApi(CDN_URL, API_URL)
const events = new EventEmitter()
const appData = new AppState({}, events)

// Создание компонентов
const page = new Page(document.body, events)
const basket = new Basket(cloneTemplate(basketTemplate), events)
// ... другие компоненты

// Создание презентеров
const modalPresenter = new ModalPresenter(events)
const productPresenter = new ProductPresenter(events, appData, page, modalPresenter)
// ... другие презентеры

// Загрузка данных
api.getProductList()
    .then((data) => appData.setCatalog(data))
    .catch(console.error)