// src/components/common/modal.ts
import {Component} from "../base/BaseComponents";
import {ensureElement} from "../../utils/utils";
import {IEvents} from "../base/BaseEvents";

interface IModalData {
    content: HTMLElement;
}

export class Modal extends Component<IModalData> {
    protected _closeButton: HTMLButtonElement;
    protected _content: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.events = events;

        // Закрытие модалки с помощью ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape") {
                this.close()
            }
        });
        
        this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
        this._content = ensureElement<HTMLElement>('.modal__content', container);

        this._closeButton.addEventListener('click', () => this.handleClose());
        this.container.addEventListener('click', (e) => {
            if (e.target === this.container) this.handleClose();
        });
        this._content.addEventListener('click', (event) => event.stopPropagation());
    }

    private handleClose() {
        this.close();
    }

    set content(value: HTMLElement) {
        this._content.replaceChildren(value);
    }

    open() {
        this.container.classList.add('modal_active');
        this.events.emit('modal:open');
    }

    close() {
        if (this.container.classList.contains('modal_active')) {
            this.container.classList.remove('modal_active');
            this._content.innerHTML = ''; // Очищаем содержимое
            this.events.emit('modal:close'); // Эмитим событие закрытия
        }
    }
}