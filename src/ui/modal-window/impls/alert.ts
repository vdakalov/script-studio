import ModalWindow from '../index';
import ModalWindowControl from '../controls/control';
import ParagraphUiNode from '../../html/paragraph';

export default class AlertModalWindow extends ModalWindow {

  private readonly paragraph: ParagraphUiNode = new ParagraphUiNode()
    .uiNodeAppendTo(this.content);

  public open(title: string, message: string, onClose?: () => void) {
    this.header.title.text = title;
    this.paragraph.text = message;

    this.controls.uiNodeAppend(new ModalWindowControl('Ok', () => {
      this.close();
      if (onClose !== undefined) {
        onClose();
      }
    }, true));
    this.show();
  }

  public close(): void {
    this.hide();
  }
}
