import ModalWindow from '../../ui/custom/modal-window';
import ModalWindowControl, { Key } from '../../ui/custom/modal-window/controls/control';
import UiNode from '../ui';

export default class ContentModalWindow extends ModalWindow {

  public open(): this {
    this.show();
    return this;
  }

  public close(): this {
    this.hide();
    return this;
  }

  public setTitle(text: string): this {
    this.title = text;
    return this;
  }

  public setContent(node: UiNode<HTMLElement>): this {
    this.content.removeAll();
    this.content.uiNodeAppend(node);
    return this;
  }

  public addControl(text: string, callback: () => void, defaultOnKey?: Key): this {
    this.controls.uiNodeAppend(new ModalWindowControl(text, callback, defaultOnKey));
    return this;
  }
}
