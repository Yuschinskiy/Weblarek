// src/components/cards.ts 
import { IProduct } from '../types'; 
import { Component } from './base/BaseComponents'; 
import { settings } from '../utils/constants'; 
import { ensureElement } from '../utils/utils'; 

interface ICardActions { 
    onClick: (event: MouseEvent) => void; 
} 

export interface ICards extends IProduct { 
    titleButton?: string; 
    identifierCard?: string; 
    
} 

export class Cards extends Component<ICards> { 
    protected idIdeficationElement?: HTMLElement; 
    protected titleElement: HTMLElement; 
    protected descriptionElement?: HTMLElement; 
    protected imageElement: HTMLImageElement; 
    protected category: HTMLElement; 
    protected priceElement: HTMLElement; 
    protected button?: HTMLButtonElement; 
    protected titleButton?: HTMLElement; 

    constructor(container: HTMLElement, actions?: ICardActions) { 
        super(container); 

        // Ищем элементы, которые могут быть в карточке корзины 
        this.idIdeficationElement = container.querySelector('.basket__item-index'); 
        this.titleElement = ensureElement<HTMLElement>('.card__title', container); 
        this.descriptionElement = container.querySelector('.card__text'); 
        this.imageElement = container.querySelector('.card__image'); 
        this.priceElement = container.querySelector('.card__price') as HTMLElement; 
        this.category = container.querySelector('.card__category') as HTMLElement; 
        this.button = container.querySelector('.card__button') ||  
                     container.querySelector('.basket__item-delete') as HTMLButtonElement; 

        if (actions?.onClick) { 
            if (this.button) { 
                this.button.addEventListener('click', actions.onClick); 
            } else { 
                container.addEventListener('click', actions.onClick); 
            } 
        } 
    } 

    set id(value: string) { 
        this.container.dataset.id = value; 
    } 

    set identifierCard(value: string) { 
        if (this.idIdeficationElement) { 
            this.setText(this.idIdeficationElement, value); 
        } 
    } 

    set title(value: string) { 
        this.setText(this.titleElement, value); // Исправлено: было 1, стало value
    } 

    set description(value: string) { 
        if (this.descriptionElement) { 
            this.setText(this.descriptionElement, value); 
        } 
    } 

    set image(value: string) { 
        this.setImage(this.imageElement, value, this.title); 
    } 

    set price(value: number) { 
        this.setText(this.priceElement, value ? `${value} синапcов` : 'бесценно'); 
    } 

    set categoryElement(value: string) { 
        this.setText(this.category, value); 
        this.toggleClass(this.category, settings[value], true); 
    } 

    // Добавлен метод setButtonText
    setButtonText(text: string) { 
        if (this.button) { 
            this.setText(this.button, text); 
        } 
    } 

    setButtonState(isInBasket:boolean, price: number) { 
        if (!this.button) return; 

        if (price > 0 || price) { 
            this.setDisabled(this.button, false); 
            this.toggleClass(this.button, 'card__button--active', true); 
            this.setText(this.priceElement, `${price} синапсов`); 
            this.setText(this.button,isInBasket ? 'Удалить из корзины' : 'Купить'); 
        } else { 
            this.setDisabled(this.button, true); 
            this.toggleClass(this.button, 'card__button--disabled', true); 
            this.setText(this.priceElement, 'Бесценно'); 
            this.setText(this.button, 'Недоступно'); 
        } 
    } 
}