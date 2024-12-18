import UiNode from '../libs/ui';

export default class TextUiNode<T extends HTMLElement> extends UiNode<T> {

  public get text(): string {
    return this.uiNodeElement.textContent || '';
  }

  public set text(value: string) {
    this.uiNodeElement.textContent = value;
  }

  constructor(tagName: keyof HTMLElementTagNameMap, initial?: string) {
    super(tagName);
    if (initial !== undefined) {
      this.text = initial;
    }
  }
}
