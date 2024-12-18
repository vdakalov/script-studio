import UiNode from '../../libs/ui';

export default class LabelUiNode extends UiNode<HTMLLabelElement> {
  constructor(_for?: string) {
    super('label');
    if (_for !== undefined) {
      this.uiNodeElement.htmlFor = _for;
    }
  }
}
