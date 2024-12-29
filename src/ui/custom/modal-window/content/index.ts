import UiNode from '../../../../libs/ui';

export default class ModalWindowContent extends UiNode<HTMLDivElement> {

  constructor() {
    super('div');
  }

  public append<T extends UiNode<HTMLElement>>(node: T, before?: UiNode<HTMLElement> | number): T {
    return this.uiNodeAppend(node, before);
  }

  public removeAll(): void {
    this.uiNodeRemoveAll();
  }
}
