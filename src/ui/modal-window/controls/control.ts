import UiNode from '../../../libs/ui';
import ButtonUiNode from '../../html/button';

export type Handler = (event: HTMLElementEventMap['click']) => void;

export default class ModalWindowControl extends UiNode<HTMLLIElement> {

  public readonly default: boolean;

  public readonly button: ButtonUiNode;

  constructor(text: string, handler?: Handler, _default: boolean = false) {
    super('li');
    this.button = new ButtonUiNode(text, handler)
      .uiNodeAppendTo(this);
    this.default = _default;
  }
}
