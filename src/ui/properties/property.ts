import SpanUiNode from '../html/span';
import TableRowUiNode from '../html/table/row';
import TableCellUiNode from '../html/table/cell';
import PropertiesUiNode from './index';

export type OnChange<T> = (value: T) => void;

export default abstract class PropertyUiNode<T> extends TableRowUiNode {

  public get changed(): boolean {
    return this.initial !== this._current;
  }

  public get current(): T {
    return this._current;
  }

  public set current(value: T) {
    this.setPropertyValue(value);
  }

  protected readonly labelCell: TableCellUiNode = TableCellUiNode.createDataCell()
    .uiNodeClass(['LabelTableCellUiNode'])
    .uiNodeAppendTo(this);

  protected readonly valueCell: TableCellUiNode = TableCellUiNode.createDataCell()
    .uiNodeClass(['ValueTableCellUiNode'])
    .uiNodeAppendTo(this);

  private readonly labelSpan: SpanUiNode = new SpanUiNode()
    .uiNodeAppendTo(this.labelCell);

  protected readonly initial: T;

  private _current: T;

  private readonly propertyOnCustomChange: OnChange<T> | undefined;

  constructor(label: string, initial: T, onChange?: OnChange<T>) {
    super();
    this.labelSpan.text = label;
    this.initial = initial;
    this._current = initial;
    this.propertyOnCustomChange = onChange;

    this.valueCell.uiNodeAppendTo(this);
  }

  protected onPropertyValueChanged(value: T): void {
    if (this._current !== value) {
      this._current = value;
      if (this.propertyOnCustomChange !== undefined) {
        this.propertyOnCustomChange(value);
      }
    }
  }

  protected abstract setPropertyValue(value: T): void;

  public reset(): void {
    this.setPropertyValue(this.initial);
    this.onPropertyValueChanged(this.initial);
  }

  public addTo(properties: PropertiesUiNode): this {
    properties.add(this);
    return this;
  }
}
