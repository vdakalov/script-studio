import PropertyUiNode from '../property';
import SpanUiNode from '../../../html/span';

export default class StaticPropertyUiNode extends PropertyUiNode<string> {

  private readonly value: SpanUiNode = new SpanUiNode()
    .uiNodeAppendTo(this.valueCell);

  constructor(label: string, value: string) {
    super(label, value);
    this.value.text = value;
  }

  protected setPropertyValue(value: string): void {
    this.value.text = value;
  }
}
