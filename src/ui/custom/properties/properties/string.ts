import PropertyUiNode from '../property';
import TextInputUiNode from '../../../html/input/text';

export default class StringPropertyUiNode extends PropertyUiNode<string> {
  private readonly input: TextInputUiNode = new TextInputUiNode(this.initial, {
    change: () => this.onPropertyValueChanged(this.input.value)
  })
    .uiNodeAppendTo(this.valueCell);

  protected setPropertyValue(value: string): void {
    this.input.value = value;
  }
}
