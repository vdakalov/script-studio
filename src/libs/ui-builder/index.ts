import UiNode from '../ui';

export type Handler<B extends UiBuilder<UiNode<HTMLElement>>> = (constructor: B) => unknown;

export default abstract class UiBuilder<T extends UiNode<HTMLElement>> {
  public readonly uiNode: T;
  constructor(uiNode: T) {
    this.uiNode = uiNode;
  }

  protected define<E extends UiBuilder<UiNode<HTMLElement>>>(builder: E, handler?: Handler<E>): this {
    builder.uiNode.uiNodeAppendTo(this.uiNode);
    if (handler !== undefined) {
      handler(builder);
    }
    return this;
  }
}
