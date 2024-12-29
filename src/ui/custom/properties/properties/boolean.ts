import PropertyUiNode from '../property';
import CheckboxInputUiNode from '../../../html/input/checkbox';

export default class BooleanPropertyUiNode extends PropertyUiNode<boolean> {
  private readonly input: CheckboxInputUiNode = new CheckboxInputUiNode(this.initial, {
    click: event => event.stopPropagation()
  })
    .uiNodeInit(() => this.valueCell.uiNodeElement.addEventListener('click', () =>
      this.onPropertyValueChanged(this.input.value = !this.input.value)))
    .uiNodeAppendTo(this.valueCell);

  protected setPropertyValue(value: boolean): void {
    this.input.value = value;
  }
}
