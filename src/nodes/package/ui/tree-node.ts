import CollapsableTreeNode from '../../../ui/custom/tree/nodes/collapsable';
import PackageModel from '../model';
import ModuleView from '../../module/view';
import ModuleModel, { create } from '../../module/model';
import Context from '../../../libs/context';
import { MenuItem } from '../../../libs/context-menu';
import ContentModalWindow from '../../../libs/modal-windows/content';
import PropertiesUiNode from '../../../ui/custom/properties';
import StringPropertyUiNode from '../../../ui/custom/properties/properties/string';
import TextPropertyUiNode from '../../../ui/custom/properties/properties/text';
import TabsUiNode from '../../../ui/custom/tabs';
import StaticPropertyUiNode from '../../../ui/custom/properties/properties/static';
import SemverPropertyUiNode from '../../../ui/custom/properties/properties/semver';
import PropertiesModalWindow from './modal-windows/properties';

export default class PackageTreeNode extends CollapsableTreeNode {

  private readonly propertiesModalWindow: PropertiesModalWindow;

  private readonly model: PackageModel;

  private readonly context: Context;

  private readonly menu: MenuItem[] = [
    {
      text: 'New class',
      handler: this.onNewClass.bind(this),
    },
    {
      text: 'New module',
      handler: this.onNewModule.bind(this),
    },
    {
      text: 'Properties',
      handler: this.onProperties.bind(this),
    }
  ];

  constructor(model: PackageModel, context: Context) {
    super();
    this.model = model;
    this.context = context;

    this.propertiesModalWindow = new PropertiesModalWindow(model);

    context.contextMenu
      .register(() => this.menu, [this.label.uiNodeElement]);

    this.update();

    for (const moduleModel of model.modules) {
      this.addModule(moduleModel);
    }
  }

  private update(): void {
    this.label.text = `${this.model.data.name} (${this.model.data.version})`;
  }

  private addModule(moduleModel: ModuleModel): void {
    this.uiNodeAppend(new ModuleView(moduleModel));
  }

  private onNewModule(): void {
    this.context.prompt.open('New Module', 'New module name:', 'UntitledModule', name => {
      if (name !== undefined && name.length !== 0) {
        const moduleModel = create(name);
        const moduleView = new ModuleView(moduleModel);
        this.collapsableTreeNodeChildren.uiNodeAppend(moduleView);
      }
    });
  }

  private onProperties(): void {
    this.propertiesModalWindow.open();
  }

  private onNewClass(): void {
    this.context.prompt.open('New class', 'Enter class name:', 'NewClass', name => {
      if (name === undefined || name.length) {
        return undefined;
      }
      this.model.modules
    });
  }
}
