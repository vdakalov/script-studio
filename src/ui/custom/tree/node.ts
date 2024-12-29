import UiNode from '../../../libs/ui';
import Toolbar from './toolbar';
import TextToolbarItem from './toolbar/items/text';

export default abstract class TreeNode extends UiNode<HTMLLIElement> {

  public readonly toolbar: Toolbar = new Toolbar()
    .uiNodeAppendTo(this);

  public readonly label: TextToolbarItem = new TextToolbarItem('')
    .uiNodeAppendTo(this.toolbar);

  constructor() {
    super('li');
  }
}
