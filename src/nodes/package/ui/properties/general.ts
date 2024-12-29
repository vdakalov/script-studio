import PropertiesUiNode from '../../../../ui/custom/properties';
import PackageModel from '../../model';
import StaticPropertyUiNode from '../../../../ui/custom/properties/properties/static';

export default class GeneralProperties extends PropertiesUiNode {

  private readonly id: StaticPropertyUiNode;

  constructor(model: PackageModel) {
    super();

    this.id = new StaticPropertyUiNode('ID', model.id)
      .uiNodeAppendTo(this);
  }
}
