// /src/presenters/OrderPresenter.ts
import { AppState } from '../components/appData';
import { OrderForm, ContactsForm } from '../components/order';
import { ModalPresenter } from './ModalPresenter';
import { Progres } from '../components/common/succes';
import { EventEmitter } from '../components/base/BaseEvents';
import { MarketApi } from '../components/apiWebLarek';
import { IContact, IOrder } from '../types';
import { cloneTemplate, ensureElement } from '../utils/utils';

export class OrderPresenter {
	private orderTemplate: HTMLTemplateElement;
	private contactsTemplate: HTMLTemplateElement;
	private successTemplate: HTMLTemplateElement;

	constructor(
		private events: EventEmitter,
		private appData: AppState,
		private orderForm: OrderForm,
		private contactsForm: ContactsForm,
		private modalPresenter: ModalPresenter,
		private api: MarketApi
	) {
		this.orderTemplate = ensureElement<HTMLTemplateElement>('#order');
		this.contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
		this.successTemplate = ensureElement<HTMLTemplateElement>('#success');
		this.bindEvents();
	}

	private bindEvents(): void {
		// Открытие формы заказа
		this.events.on('order:open', () => {
			this.openOrderForm();
		});

		// Открытие формы контактов
		this.events.on('contact:open', () => {
			this.openContactsForm();
		});

		// Валидация форм
		this.events.on('formErrors:change', (errors: Partial<IOrder>) => {
			this.updateFormValidation(errors);
		});

		// Изменения в полях форм
		this.events.on(
			/^order\..*:change/,
			(data: { field: string; value: string }) => {
				if (['address', 'payment'].includes(data.field)) {
					this.appData.setOrderField(data.field as keyof IOrder, data.value);
				}
			}
		);

		this.events.on(
			/^contacts\..*:change/,
			(data: { field: string; value: string }) => {
				if (['email', 'phone'].includes(data.field)) {
					this.appData.setContactField(
						data.field as keyof IContact,
						data.value
					);
				}
			}
		);

		// Отправка заказа
		this.events.on('order:submit', () => {
			this.submitOrder();
		});

		// Отправка контактов
		this.events.on('contacts:submit', () => {
			this.submitContacts();
		});
	}

	private openOrderForm(): void {
		this.modalPresenter.openModal(
			this.orderForm.render({ address: '', errors: [], valid: false })
		);
	}

	private openContactsForm(): void {
		this.modalPresenter.openModal(
			this.contactsForm.render({
				phone: '',
				email: '',
				errors: [],
				valid: false,
			})
		);
	}

	private updateFormValidation(errors: Partial<IOrder>): void {
    const { address, payment, email, phone } = errors;
    
    // Валидация формы заказа
    this.orderForm.valid = !address && !payment;
    this.orderForm.errors = Object.values({ address, payment })
        .filter(Boolean)
        .join('; ');
    
    // Валидация формы контактов
    this.contactsForm.valid = !email && !phone;
    this.contactsForm.errors = Object.values({ email, phone })
        .filter(Boolean)
        .join('; ');
}

	private submitOrder(): void {
		this.events.emit('contact:open'); // Переход к контактам
	}

	private submitContacts(): void {
		this.api
			.order(this.appData.getOrderToPost())
			.then((res) => {
				this.appData.clearBasket();
				const progres = new Progres(cloneTemplate(this.successTemplate), {
					onClick: () => {
						this.modalPresenter.closeModal();
						this.appData.resetOrder();
						this.appData.resetContact();
					},
				});
				this.modalPresenter.openModal(progres.render({ total: res.total }));
			})
			.catch(console.error);
	}
}
