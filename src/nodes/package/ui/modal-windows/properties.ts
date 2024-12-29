import PackageModel from '../../model';
import TabsUiNode from '../../../../ui/custom/tabs';
import GeneralProperties from '../properties/general';
import PackageProperties from '../properties/package';
import ContentModalWindow from '../../../../libs/modal-windows/content';

export default class PropertiesModalWindow extends ContentModalWindow {

  private readonly tabs: TabsUiNode = new TabsUiNode();

  private readonly propertiesGeneral: GeneralProperties;

  private readonly propertiesPackage: PackageProperties;

  constructor(model: PackageModel) {
    super();

    this.title = `Properties "${model.data.name}"`;
    this.setContent(this.tabs);

    this.propertiesGeneral = new GeneralProperties(model);
    this.propertiesPackage = new PackageProperties(model);

    this.tabs.add('General', this.propertiesGeneral);
    this.tabs.add('Package', this.propertiesPackage);

    this.addControl('Apply', this.onApply.bind(this));
    this.addControl('Close', this.onClose.bind(this));
  }

  private onApply(): void {
    this.propertiesPackage.apply();
    this.hide();
  }

  private onClose(): void {
    this.hide();
  }
}
