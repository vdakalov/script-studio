import UiNode from '../../../../libs/ui';
import SpanUiNode from '../../../html/span';

export default class TabUiNode extends UiNode<HTMLLIElement> {

  public get text(): string {
    return this.span.text;
  }

  public set text(value: string) {
    this.span.text = value;
  }

  private readonly span: SpanUiNode = new SpanUiNode()
    .uiNodeAppendTo(this);

  constructor(initial?: string) {
    super('li');
    if (initial !== undefined) {
      this.text = initial;
    }
  }
}
