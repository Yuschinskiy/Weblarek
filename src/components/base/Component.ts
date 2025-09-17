//src/copmonents/base/Component.ts
/**
 * Базовый компонент
 */
// src/components/base/Component.ts
export abstract class Component<T> {
  protected element: HTMLElement;

  constructor(tagName: string = 'div', className?: string) {
    this.element = document.createElement(tagName);
    if (className) this.element.className = className;
  }

  getElement(): HTMLElement {
    return this.element;
  }

  abstract render(): HTMLElement;
  abstract update(data: T): void;
}

