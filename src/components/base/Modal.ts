// src/components/base/Modal.ts
import { Component } from './Component';

export class Modal extends Component<{ title: string; content: string }> {
  private onClose: () => void;

  constructor(onClose: () => void) {
    super('div', 'modal');
    this.onClose = onClose;

    this.element.addEventListener('click', (e) => {
      if (e.target === this.element) this.onClose();
    });
  }

  render(): HTMLElement {
    return this.element;
  }

  update(data: { title: string; content: string }): void {
    this.element.innerHTML = `
      <div class="modal__content">
        <button class="modal__close">&times;</button>
        <h2>${data.title}</h2>
        <div>${data.content}</div>
      </div>
    `;

    const closeBtn = this.element.querySelector('.modal__close');
    closeBtn?.addEventListener('click', () => this.onClose());
  }
}