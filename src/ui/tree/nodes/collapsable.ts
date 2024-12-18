import TreeNode from '../node';
import TreeNodes from '../nodes';
import ArrowButtonToolbarItem from '../toolbar/items/arrow-button';

export default class CollapsableTreeNode extends TreeNode {

  public readonly button = new ArrowButtonToolbarItem('', this.toggle.bind(this))
    .uiNodeAppendTo(this.toolbar, 0);

  public readonly children: TreeNodes = new TreeNodes()
    .uiNodeAppendTo(this);

  private toggle(): void {
    if (this.uiNodeElement.classList.toggle('collapsed')) {
      this.children.uiNodeRemove();
    } else {
      this.children.uiNodeAppendTo(this);
    }
  }
}
