import UiNode from '../../../libs/ui';

export default class TableCellUiNode extends UiNode<HTMLTableCellElement> {

  public static createHeaderCell(): TableCellUiNode {
    return new this('th');
  }

  public static createDataCell(): TableCellUiNode {
    return new this('td');
  }

  protected constructor(tagName: 'td' | 'th') {
    super(tagName);
  }
}
