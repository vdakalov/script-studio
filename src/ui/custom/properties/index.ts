import SpanUiNode from '../../html/span';
import PropertyUiNode from './property';
import TableUiNode from '../../html/table';
import TableSectionUiNode from '../../html/table/section';
import TableRowUiNode from '../../html/table/row';
import TableCellUiNode from '../../html/table/cell';

export default class PropertiesUiNode extends TableUiNode {

  private readonly head: TableSectionUiNode = TableSectionUiNode.createHead()
    .uiNodeAppendTo(this);

  private readonly body: TableSectionUiNode = TableSectionUiNode.createBody()
    .uiNodeAppendTo(this);

  private readonly headRow: TableRowUiNode = new TableRowUiNode()
    .uiNodeAppendTo(this.head);

  private readonly headerCellLabel: TableCellUiNode = TableCellUiNode.createHeaderCell()
    .uiNodeAppendTo(this.headRow);

  private readonly headerCellLabelSpan: SpanUiNode = new SpanUiNode('Label')
    .uiNodeAppendTo(this.headerCellLabel);

  private readonly headerCellValue: TableCellUiNode = TableCellUiNode.createHeaderCell()
    .uiNodeAppendTo(this.headRow);

  private readonly headerCellValueSpan: SpanUiNode = new SpanUiNode('Value')
    .uiNodeAppendTo(this.headerCellValue);

  public add(property: PropertyUiNode<any>): this {
    this.body.uiNodeAppend(property);
    return this;
  }
}
