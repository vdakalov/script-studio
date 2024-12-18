import ModalWindow from '../index';
import ModalWindowControl from '../controls/control';
import InputUiNode from '../../html/input';
import ParagraphUiNode from '../../html/paragraph';
import TextInputUiNode from '../../html/input/text';

export type Callback = (text?: string) => void;

export default class PromptModalWindow extends ModalWindow {

  private callback: Callback | undefined = undefined;

  protected onHidden() {
    if (this.callback !== undefined) {
      this.callback();
    }
  }

  public open(title: string, message: string, _default: string, callback: Callback): void {
    this.title = title;

    const input = new TextInputUiNode(_default, {
      keydown: (event: KeyboardEvent, input: InputUiNode) => {
        if (event.key === 'Enter') {
          event.stopPropagation();
          this.hide();
          callback(input.uiNodeElement.value);
        }
      }
    });
    this.content.uiNodeAppendAll([new ParagraphUiNode(message), input]);
    this.controls
      .uiNodeAppendAll([
        new ModalWindowControl('Ok', () => callback(input.uiNodeElement.value), true),
        new ModalWindowControl('Cancel', () => callback())
      ]);
    this.show();
    input
      .focus()
      .select();
  }
}
