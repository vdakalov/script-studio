import PropertyUiNode from '../property';
import TextAreaUiNode from '../../html/textarea';

export default class TextPropertyUiNode extends PropertyUiNode<string> {
  private readonly textArea: TextAreaUiNode = new TextAreaUiNode(this.initial)
    .uiNodeInit(element =>
      element.addEventListener('change', () => this.onPropertyValueChanged(element.value)))
    .uiNodeAppendTo(this.valueCell);

  protected setPropertyValue(value: string): void {
    this.textArea.value = value;
  }
}
