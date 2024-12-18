import UiNode from '../../../libs/ui';
import ModalWindowHeaderTitle from './title';

export default class ModalWindowHeader extends UiNode<HTMLDivElement> {

  public readonly title: ModalWindowHeaderTitle = new ModalWindowHeaderTitle()
    .uiNodeAppendTo(this);

  constructor() {
    super('div');
  }
}
