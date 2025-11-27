// /src/presenters/ModalPresenter.ts
import { Modal } from '../components/common/modal';
import { EventEmitter } from '../components/base/BaseEvents';
import { ensureElement } from '../utils/utils';

export class ModalPresenter {
    private modal: Modal;

    constructor(private events: EventEmitter) {
        const modalContainer = ensureElement<HTMLElement>('#modal-container');
        this.modal = new Modal(modalContainer, this.events);
    }

    openModal(content: HTMLElement): void {
        this.modal.content = content;
        this.modal.open();
    }

    closeModal(): void {
        this.modal.close();
    }
}