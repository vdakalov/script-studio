import UiNode from '../../libs/ui';
import ModalWindowHeader from './header';
import ModalWindowContent from './content';
import ModalWindowControl from './controls/control';
import ModalWindowControls from './controls';

export default abstract class ModalWindow extends UiNode<HTMLDivElement> {

  protected get showed(): boolean {
    return this.uiNodeElement.parentElement !== null;
  }

  protected set title(value: string) {
    this.header.title.text = value;
  }

  protected readonly header: ModalWindowHeader = new ModalWindowHeader()
    .uiNodeAppendTo(this);

  protected content: ModalWindowContent = new ModalWindowContent()
    .uiNodeAppendTo(this);

  protected controls: ModalWindowControls = new ModalWindowControls()
    .uiNodeAppendTo(this);

  constructor() {
    super('div');
    this.uiNodeElement.tabIndex = 0;
    this.uiNodeElement.addEventListener('keydown', this.onKeydown.bind(this));
  }

  private onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter':
        const control = this.controls.uiNodeChildren
          .find(child => child instanceof ModalWindowControl && child.default) as ModalWindowControl;
        if (control) {
          control.button.uiNodeElement.click();
        }
        break;
      case 'Escape':
        this.hide();
        break;
    }
  }

  protected onHidden(): void {}

  protected show(): void {
    window.document.body.appendChild(this.uiNodeElement);
    this.uiNodeElement.focus();
  }

  protected hide(): void {
    if (this.uiNodeElement.parentElement !== null) {
      this.uiNodeElement.parentElement.removeChild(this.uiNodeElement);
      this.onHidden();
    }
  }
}
