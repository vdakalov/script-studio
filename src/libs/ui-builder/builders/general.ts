import UiNode from '../../ui';
import UiBuilder, { Handler } from '../index';
import FormBuilder from './form';
import ParagraphBuilder from './paragraph';
import TextInputBuilder from './text-input';

export default class GeneralUiBuilder<T extends HTMLElement> extends UiBuilder<UiNode<T>> {

  constructor(uiNode: UiNode<T>) {
    super(uiNode);
  }

  public appendParagraph(initial: Handler<ParagraphBuilder> | string): this {
    const text = typeof initial === 'string' ? initial : undefined;
    const handler = typeof initial === 'function' ? initial : undefined;
    return this.define(new ParagraphBuilder(text), handler);
  }

  public appendTextInput(handler: Handler<TextInputBuilder>): this {
    return this.define(new TextInputBuilder(), handler);
  }

  public appendForm(handler: Handler<FormBuilder>): this {
    return this.define(new FormBuilder(), handler);
  }
}
