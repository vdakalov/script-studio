import FormUiNode from '../../../../ui/html/form';
import { Handler } from '../../index';
import FieldsetBuilder from '../fieldset';
import GeneralUiBuilder from '../general';

export default class FormBuilder extends GeneralUiBuilder<HTMLFormElement> {
  constructor() {
    super(new FormUiNode());
  }

  public appendFieldset(handler: Handler<FieldsetBuilder>): this {
    return this.define(new FieldsetBuilder(), handler);
  }
}
