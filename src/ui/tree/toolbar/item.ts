import UiNode from '../../../libs/ui';

export default abstract class ToolbarItem<T extends HTMLElement> extends UiNode<HTMLLIElement> {

  protected readonly itemElement: T;

  constructor(tagName: keyof HTMLElementTagNameMap) {
    super('li');
    this.itemElement = this.uiNodeCreateChildren(tagName) as T;
  }
}
