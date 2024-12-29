import UiNode from '../../../libs/ui';

export default class TreeNodes extends UiNode<HTMLUListElement> {
  constructor() {
    super('ul');
  }

  public mount(node: Node): void {
    node.appendChild(this.uiNodeElement);
  }
}
