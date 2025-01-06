import CollapsableTreeNode from '../../../../custom/tree/nodes/collapsable';
import Context from '../../../../../libs/context';
import ProjectTypeController, { Event as ProjectTypeControllerEvent } from '../../../../../types/project/controller';
import PackageTreeUiNode from './package';
import PackageTypeController from '../../../../../types/package/controller';
import { MenuItem } from '../../../../../libs/context-menu';

export default class ProjectTreeNodeUiNode extends CollapsableTreeNode {

  public static create(context: Context, name: string): ProjectTreeNodeUiNode {
    const controller = ProjectTypeController.create(name);
    return new this(controller, context);
  }

  public readonly type: ProjectTypeController;

  public readonly packages: PackageTreeUiNode[] = [];

  private readonly context: Context;

  private readonly menuItems: MenuItem[] = [{
    handler: this.onCreatePackage.bind(this),
    text: 'New Package'
  }];

  constructor(projectType: ProjectTypeController, context: Context) {
    super();
    this.type = projectType;
    this.context = context;
    for (const packageType of projectType.packages) {
      const package_ = new PackageTreeUiNode(packageType, this.context)
        .uiNodeAppendTo(this.collapsableTreeNodeChildren);
      this.packages.push(package_);
    }

    this.type.on(ProjectTypeControllerEvent.PackageAppended, this.onPackageAppended.bind(this));

    this.context.contextMenu.register(() => this.menuItems, [this.label.uiNodeElement]);
  }

  private onCreatePackage(): void {
    this.context.prompt.open('New Package', 'Enter package name:', 'new-package', name => {
      if (name === undefined || name.length === 0) {
        return;
      }
      const package_ = PackageTypeController.create(name);
      this.type.appendPackage(package_);
    });
  }

  private onPackageAppended(packageTypeController: PackageTypeController): void {
    const package_ = new PackageTreeUiNode(packageTypeController, this.context)
      .uiNodeAppendTo(this.collapsableTreeNodeChildren);
    this.packages.push(package_);
  }
}
