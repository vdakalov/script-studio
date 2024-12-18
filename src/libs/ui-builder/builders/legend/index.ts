import LegendUiNode from '../../../../ui/html/legend';
import UiBuilder from '../../index';

export default class LegendBuilder extends UiBuilder<LegendUiNode> {
  constructor(initial?: string) {
    super(new LegendUiNode(initial));
  }

  public setText(text: string): this {
    this.uiNode.uiNodeElement.textContent = text;
    return this;
  }
}
