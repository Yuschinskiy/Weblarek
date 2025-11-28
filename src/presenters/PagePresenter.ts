// /src/presenters/PagePresenter.ts
import { Page } from '../components/page';
import { AppState } from '../components/appData';
import { EventEmitter } from '../components/base/BaseEvents';

export class PagePresenter {
	constructor(
		private events: EventEmitter,
		private appData: AppState,
		private page: Page
	) {
		this.bindEvents();
	}

	private bindEvents(): void {
		// Обновление счётчика корзины
		this.events.on('basket:update', () => {
			this.page.counter = this.appData.basket.length;
		});
		this.events.on('basket:change', () => {
			this.page.counter = this.appData.basket.length;
		});

		// Блокировка страницы при модале - УЖЕ ЕСТЬ!
		this.events.on('modal:open', () => {
			this.page.locked = true;
		});
		this.events.on('modal:close', () => {
			this.page.locked = false;
		});
	}
}
