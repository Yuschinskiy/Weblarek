// /src/presenters/ProductPresenter.ts
import { AppState } from '../components/appData';
import { Page } from '../components/page';
import { Cards } from '../components/cards';
import { ModalPresenter } from './ModalPresenter';
import { EventEmitter } from '../components/base/BaseEvents';
import { IProduct } from '../types';
import { cloneTemplate, ensureElement } from '../utils/utils';

export class ProductPresenter {
	private cardCatalogTemplate: HTMLTemplateElement;
	private cardPreviewTemplate: HTMLTemplateElement;

	constructor(
		private events: EventEmitter,
		private appData: AppState,
		private page: Page,
		private modalPresenter: ModalPresenter
	) {
		this.cardCatalogTemplate =
			ensureElement<HTMLTemplateElement>('#card-catalog');
		this.cardPreviewTemplate =
			ensureElement<HTMLTemplateElement>('#card-preview');
		this.bindEvents();
	}

	private bindEvents(): void {
		this.events.on('catalog:change', () => {
			this.updateCatalog();
		});

		this.events.on<IProduct>('product:select', (item) => {
			this.showProductPreview(item);
		});
	}

	private updateCatalog(): void {
		console.log(this.appData.catalog);

		this.page.catalog = this.appData.catalog.map((item) => {
			const card = new Cards(cloneTemplate(this.cardCatalogTemplate), {
				onClick: () => this.events.emit('product:select', item),
			});
			return card.render({
				title: item.title,
				image: item.image,
				price: item.price,
				category: item.category,
			});
		});
	}

	private showProductPreview(item: IProduct): void {
		const isInBasket = this.appData.basket.some((p) => p.id === item.id);

		const card = new Cards(cloneTemplate(this.cardPreviewTemplate), {
			onClick: () => {
				if (isInBasket) {
					this.appData.removeFromBasket(item);
				} else {
					this.appData.addToBasket(item);
				}
				this.modalPresenter.closeModal();
			},
		});

		const previewCard = card.render({
			title: item.title,
			image: item.image,
			price: item.price,
			category: item.category,
			description: item.description,
		});

		// card.setButtonText(isInBasket ? 'Удалить из корзины' : 'В корзину');
		card.setButtonState(isInBasket, item.price);
		this.modalPresenter.openModal(previewCard);
	}
}
