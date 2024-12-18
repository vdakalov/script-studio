import ModalWindow from '../index';
import ModalWindowControl from '../controls/control';
import ParagraphUiNode from '../../html/paragraph';

export type Callback = (value?: boolean) => void;

export default class ConfirmModalWindow extends ModalWindow {

  private readonly paragraph: ParagraphUiNode = new ParagraphUiNode()
    .uiNodeAppendTo(this.content);

  private callback: Callback | undefined = undefined;

  protected onHidden() {
    if (this.callback !== undefined) {
      this.callback();
    }
  }

  public open(title: string, message: string, callback: Callback): void {
    this.title = title;
    this.callback = callback;
    this.paragraph.text = message;
    this.controls
      .uiNodeAppendAll([
        new ModalWindowControl('Yes', () => callback(true)),
        new ModalWindowControl('No', () => callback(false))
      ]);
  }
}
