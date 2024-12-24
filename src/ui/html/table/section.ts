import UiNode from '../../../libs/ui';

export default class TableSectionUiNode extends UiNode<HTMLTableSectionElement> {
  public static createHead(): TableSectionUiNode {
    return new this('thead');
  }

  public static createBody(): TableSectionUiNode {
    return new this('tbody');
  }

  public static createFoot(): TableSectionUiNode {
    return new this('tfoot');
  }

  protected constructor(tagName: 'thead' | 'tbody' | 'tfoot') {
    super(tagName);
  }
}
