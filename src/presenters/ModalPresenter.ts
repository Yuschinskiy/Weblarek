// src/presenters/ModalPresenter.ts
import { Modal } from '../components/base/Modal';

export class ModalPresenter {
  private modal: Modal;
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
    this.modal = new Modal(this.close.bind(this));
  }

  open(title: string, content: string) {
    this.modal.update({ title, content });
    this.container.appendChild(this.modal.render());
  }

  close() {
    if (this.modal.getElement().parentElement === this.container) {
      this.container.removeChild(this.modal.getElement());
    }
  }
}