import PropertyUiNode from '../property';
import NumberInputUiNode from '../../html/input/number';
import TextInputUiNode from '../../html/input/text';

export default class SemverPropertyUiNode extends PropertyUiNode<string> {

  private readonly major: NumberInputUiNode = new NumberInputUiNode(undefined, {
    input: this.onChange.bind(this)
  })
    .uiNodeInit(this.initVersion.bind(this))
    .uiNodeAppendTo(this.valueCell);

  private readonly minor: NumberInputUiNode = new NumberInputUiNode(undefined, {
    input: this.onChange.bind(this)
  })
    .uiNodeInit(this.initVersion.bind(this))
    .uiNodeAppendTo(this.valueCell);

  private readonly patch: NumberInputUiNode = new NumberInputUiNode(undefined, {
    input: this.onChange.bind(this)
  })
    .uiNodeInit(this.initVersion.bind(this))
    .uiNodeAppendTo(this.valueCell);

  private readonly build: TextInputUiNode = new TextInputUiNode(undefined, {
    change: this.onChange.bind(this)
  })
    .uiNodeAppendTo(this.valueCell);

  private initVersion(element: HTMLInputElement): void {
    element.min = '0';
    element.step = '1';
  }

  private onChange(): void {
    const major = this.major.value;
    const minor = this.minor.value;
    const patch = this.patch.value;
    const build = this.build.value.trim();
    let value = `${major}.${minor}.${patch}`;
    if (build.length !== 0) {
      value += '-' + build;
    }
    this.onPropertyValueChanged(value);
  }

  protected setPropertyValue(value: string): void {
    const [version, build = ''] = value.split('-');
    const [major, minor, patch] = version.split('.')
      .map(v => Number.parseInt(v));
    if (Number.isFinite(major)) {
      this.major.value = major;
    }
    if (Number.isFinite(minor)) {
      this.minor.value = minor;
    }
    if (Number.isFinite(patch)) {
      this.patch.value = patch;
    }
    this.build.value = build;
  }
}
