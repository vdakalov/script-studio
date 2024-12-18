import CollapsableTreeNode from '../../ui/tree/nodes/collapsable';
import PackageModel from './model';
import ModuleView from '../module/view';
import ModuleModel, { create } from '../module/model';
import Context from '../../libs/context';
import { MenuItem } from '../../libs/context-menu';

export default class PackageView extends CollapsableTreeNode {

  private readonly context: Context;

  private readonly menu: MenuItem[] = [
    {
      text: 'New Module',
      handler: this.onNewModule.bind(this),
    }
  ];

  constructor(packageModel: PackageModel, context: Context) {
    super();
    this.context = context;

    this.label.text = `${packageModel.data.name} (${packageModel.data.version})`;

    context.contextMenu
      .register(() => this.menu, [this.label.uiNodeElement]);

    for (const moduleModel of packageModel.modules) {
      this.addModule(moduleModel);
    }
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
}
