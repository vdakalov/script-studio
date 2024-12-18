import UiNode from '../../libs/ui';

export default class TextAreaUiNode extends UiNode<HTMLTextAreaElement> {

  public get value(): string {
    return this.uiNodeElement.value;
  }

  public set value(value: string) {
    this.uiNodeElement.value = value;
  }

  constructor(initial?: string) {
    super('textarea');
    if (initial !== undefined) {
      this.value = initial;
    }
  }
}