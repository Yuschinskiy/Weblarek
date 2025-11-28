// src/components/common/modal.ts

import { Component } from '../base/BaseComponents';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/BaseEvents';

interface IModalData {
	content: HTMLElement;
}

export class Modal extends Component<IModalData> {
	protected _closeButton: HTMLButtonElement;
	protected _content: HTMLElement;
	private _handleEscape: (e: KeyboardEvent) => void;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);
		this.events = events;

		this._handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				this.close();
			}
		};

		this._closeButton = ensureElement<HTMLButtonElement>(
			'.modal__close',
			container
		);
		this._content = ensureElement<HTMLElement>('.modal__content', container);

		this._closeButton.addEventListener('click', () => this.close());
		this.container.addEventListener('click', (e) => {
			if (e.target === this.container) this.close();
		});
		this._content.addEventListener('click', (event) => event.stopPropagation());
	}

	set content(value: HTMLElement) {
		this._content.replaceChildren(value);
	}

	open() {
		this.toggleClass(this.container, 'modal_active', true);
		document.addEventListener('keydown', this._handleEscape);
		this.events.emit('modal:open');
	}

	close() {
		if (this.container.classList.contains('modal_active')) {
			this.toggleClass(this.container, 'modal_active', false);
			this._content.innerHTML = ''; // Очищаем содержимое
			document.removeEventListener('keydown', this._handleEscape);
			this.events.emit('modal:close');
		}
	}
}
