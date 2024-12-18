import UiBuilder from '../../index';
import ParagraphUiNode from '../../../../ui/html/paragraph';

export default class ParagraphBuilder extends UiBuilder<ParagraphUiNode> {
  constructor(text?: string) {
    super(new ParagraphUiNode(text));
  }

  public setText(text: string): this {
    this.uiNode.text = text;
    return this;
  }
}
