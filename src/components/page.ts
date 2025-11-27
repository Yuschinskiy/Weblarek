// src/components/page.ts
import { Component } from './base/BaseComponents';
import { IEvents } from './base/BaseEvents';
import { ensureElement } from '../utils/utils';

interface IPage {
    counter: number;
    catalog: HTMLElement[];
    locked: boolean;
}

export class Page extends Component<IPage> {
    protected _counter: HTMLElement;
    protected _catalog: HTMLElement;
    protected _wrapper: HTMLElement;
    protected _basket: HTMLElement;
    
    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._counter = ensureElement<HTMLElement>('.header__basket-counter', container);
        this._catalog = ensureElement<HTMLElement>('.gallery', container);
        this._wrapper = ensureElement<HTMLElement>('.page__wrapper', container);
        this._basket = ensureElement<HTMLElement>('.header__basket', container);

        this._basket.addEventListener('click', () => {
            this.events.emit('basket:open');
        });

        // Обработчик открытия модального окна
        this.events.on('modal:open', () => {
            this.locked = true;
        });

        // Обработчик закрытия модального окна
        this.events.on('modal:close', () => {
            this.locked = false;
        });
    }

    set counter(value: number) {
        this.setText(this._counter, String(value));
    }

    set catalog(items: HTMLElement[]) {
        this._catalog.replaceChildren(...items);
    }

    set locked(value: boolean) {
        if (value) {
            this._wrapper.classList.add('page__wrapper_locked');
        } else {
            this._wrapper.classList.remove('page__wrapper_locked');
        }
    }
}