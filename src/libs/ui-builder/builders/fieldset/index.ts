import FieldsetUiNode from '../../../../ui/html/fieldset';
import UiBuilder, { Handler } from '../../index';
import LegendBuilder from '../legend';

export default class FieldsetBuilder extends UiBuilder<FieldsetUiNode> {
  constructor() {
    super(new FieldsetUiNode());
  }

  public appendLegend(handler: Handler<LegendBuilder>): this {
    return this.define(new LegendBuilder(), handler);
  }
}
