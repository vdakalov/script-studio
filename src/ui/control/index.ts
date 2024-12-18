import UiNode from '../../libs/ui';
import LabelUiNode from '../html/label';
import SpanUiNode from '../html/span';

export default class ControlUiNode extends UiNode<HTMLDivElement> {

  public readonly labelUiNode: LabelUiNode = new LabelUiNode()
    .uiNodeAppendTo(this);

  public readonly spanUiNode: SpanUiNode = new SpanUiNode()
    .uiNodeAppendTo(this.labelUiNode);

  constructor(label: string) {
    super('div');
    this.spanUiNode.text = label;
  }
}
