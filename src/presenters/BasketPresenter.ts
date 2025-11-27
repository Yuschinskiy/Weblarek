// /src/presenters/BasketPresenter.ts
import { AppState } from '../components/appData';
import { Basket } from '../components/common/basket';
import { ModalPresenter } from './ModalPresenter';
import { EventEmitter } from '../components/base/BaseEvents';
import { cloneTemplate, ensureElement } from '../utils/utils';
import { Cards } from '../components/cards';
import { IProduct } from '../types';

export class BasketPresenter {
    private basketTemplate: HTMLTemplateElement;
    private cardBasketTemplate: HTMLTemplateElement;

    constructor(
        private events: EventEmitter,
        private appData: AppState,
        private basket: Basket,
        private modalPresenter: ModalPresenter
    ) {
        this.basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
        this.cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
        this.bindEvents();
    }

    private bindEvents(): void {
        this.events.on('basket:update', () => {
            this.updateBasketView();
        });
        this.events.on('basket:change', () => {
            this.updateBasketView();
        });

        this.events.on('basket:open', () => {
            this.openBasket();
        });
        
        this.events.on('basket:remove', (product: IProduct) => {
            this.appData.removeFromBasket(product);
        });
    }

    private updateBasketView(): void {
        const items = this.appData.basket.map((product, index) => {
            const card = new Cards(cloneTemplate(this.cardBasketTemplate), {
                onClick: () => this.events.emit('basket:remove', product),
            });
            return card.render({
                title: product.title,
                price: product.price,
                identifierCard: String(index + 1)
            });
        });
        this.basket.items = items;
        this.basket.priceTotal = this.appData.getTotal();
    }

    private openBasket(): void {
        this.basket.selected = this.appData.basket.length > 0;
        this.modalPresenter.openModal(this.basket.render({
            price: this.appData.getTotal(),
        }));
    }
}