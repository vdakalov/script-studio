import PropertiesUiNode from '../../../../ui/custom/properties';
import PackageModel from '../../model';
import StringPropertyUiNode from '../../../../ui/custom/properties/properties/string';
import SemverPropertyUiNode from '../../../../ui/custom/properties/properties/semver';
import TextPropertyUiNode from '../../../../ui/custom/properties/properties/text';

export default class PackageProperties extends PropertiesUiNode {

  private readonly model: PackageModel;

  private readonly name: StringPropertyUiNode;

  private readonly version: SemverPropertyUiNode;

  private readonly description: TextPropertyUiNode;

  private readonly main: StringPropertyUiNode;

  constructor(model: PackageModel) {
    super();
    this.model = model;

    this.name = new StringPropertyUiNode('Name', model.data.name)
      .uiNodeAppendTo(this);

    this.version = new SemverPropertyUiNode('Version', model.data.version)
      .uiNodeAppendTo(this);

    this.description = new TextPropertyUiNode('Description', model.data.description || '')
      .uiNodeAppendTo(this);

    this.main = new StringPropertyUiNode('Main', model.data.main || '')
      .uiNodeAppendTo(this);
  }

  /**
   * Reset values in UI to model state
   */
  public reset(): void {
    this.name.current = this.model.data.name;
    this.version.current = this.model.data.version;
    this.description.current = this.model.data.description || '';
    this.main.current = this.model.data.main || '';
  }

  /**
   * Set properties from UI into model
   */
  public apply(): void {
    this.model.data.name = this.name.current;
    this.model.data.version = this.version.current;
    this.model.data.description = this.description.current || undefined;
    this.model.data.main = this.main.current || undefined;
  }
}
