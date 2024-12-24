import CollapsableTreeNode from '../../ui/tree/nodes/collapsable';
import PackageModel from './model';
import ModuleView from '../module/view';
import ModuleModel, { create } from '../module/model';
import Context from '../../libs/context';
import { MenuItem } from '../../libs/context-menu';
import ContentModalWindow from '../../libs/modal-windows/content';
import PropertiesUiNode from '../../ui/properties';
import StringPropertyUiNode from '../../ui/properties/properties/string';
import TextPropertyUiNode from '../../ui/properties/properties/text';
import TabsUiNode from '../../ui/tabs';
import StaticPropertyUiNode from '../../ui/properties/properties/static';
import SemverPropertyUiNode from '../../ui/properties/properties/semver';

export default class PackageView extends CollapsableTreeNode {

  private readonly generalProperties: PropertiesUiNode = new PropertiesUiNode();

  private readonly generalPropertyId: StaticPropertyUiNode = new StaticPropertyUiNode('Id', '')
    .addTo(this.generalProperties);

  private readonly generalPropertyModules: StaticPropertyUiNode = new StaticPropertyUiNode('Modules', '0')
    .addTo(this.generalProperties);

  private readonly packageProperties: PropertiesUiNode = new PropertiesUiNode();

  private readonly packagePropertyName: StringPropertyUiNode = new StringPropertyUiNode('Name', '')
    .addTo(this.packageProperties);

  private readonly packagePropertyVersion: SemverPropertyUiNode = new SemverPropertyUiNode('Version', '')
    .addTo(this.packageProperties);

  private readonly packagePropertyDescription: TextPropertyUiNode = new TextPropertyUiNode('Description', '')
    .addTo(this.packageProperties);

  private readonly packagePropertyMain: StringPropertyUiNode = new StringPropertyUiNode('Main', '')
    .addTo(this.packageProperties);

  private readonly tabs: TabsUiNode = new TabsUiNode()
    .add('General', this.generalProperties)
    .add('Package', this.packageProperties);

  private readonly propertiesModalWindow: ContentModalWindow = new ContentModalWindow()
    .setContent(this.tabs)
    .addControl('Ok', this.onApplyProperties.bind(this))
    .addControl('Cancel', () => this.propertiesModalWindow.close());

  private readonly packageModel: PackageModel;

  private readonly context: Context;

  private readonly menu: MenuItem[] = [
    {
      text: 'New Module',
      handler: this.onNewModule.bind(this),
    },
    {
      text: 'Properties',
      handler: this.onProperties.bind(this),
    }
  ];

  constructor(packageModel: PackageModel, context: Context) {
    super();
    this.packageModel = packageModel;
    this.context = context;

    context.contextMenu
      .register(() => this.menu, [this.label.uiNodeElement]);

    this.update();

    for (const moduleModel of packageModel.modules) {
      this.addModule(moduleModel);
    }
  }

  private update(): void {
    this.label.text = `${this.packageModel.data.name} (${this.packageModel.data.version})`;
  }

  private addModule(moduleModel: ModuleModel): void {
    this.uiNodeAppend(new ModuleView(moduleModel));
  }

  private onNewModule(): void {
    this.context.prompt.open('New Module', 'New module name:', 'UntitledModule', name => {
      if (name !== undefined && name.length !== 0) {
        const moduleModel = create(name);
        const moduleView = new ModuleView(moduleModel);
        this.children.uiNodeAppend(moduleView);
      }
    });
  }

  private onApplyProperties(): void {
    if (this.packagePropertyName.changed) {
      this.packageModel.data.name = this.packagePropertyName.current;
    }
    if (this.packagePropertyVersion.changed) {
      this.packageModel.data.version = this.packagePropertyVersion.current;
    }
    if (this.packagePropertyDescription.changed) {
      this.packageModel.data.description = this.packagePropertyDescription.current;
    }
    if (this.packagePropertyMain.changed) {
      this.packageModel.data.main = this.packagePropertyMain.current;
    }
    this.update();
    this.propertiesModalWindow.close();
  }

  private onProperties(): void {
    this.propertiesModalWindow
      .setTitle(`Package "${this.packageModel.data.name}"`);

    this.generalPropertyId.current = this.packageModel.id;
    this.generalPropertyModules.current = this.packageModel.modules.length.toString();

    this.packagePropertyName.current = this.packageModel.data.name;
    this.packagePropertyVersion.current = this.packageModel.data.version;
    this.packagePropertyDescription.current = this.packageModel.data.description || '';
    this.packagePropertyMain.current = './index.js';

    this.propertiesModalWindow.open();
  }
}
