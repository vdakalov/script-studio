import CollapsableTreeNode from '../../../../custom/tree/nodes/collapsable';
import Context from '../../../../../libs/context';
import PackageTypeController from '../../../../../types/package/controller';
import ProjectTypeController from '../../../../../types/project/controller';
import PackageTreeUiNode from './package';

export default class ProjectTreeNodeUiNode extends CollapsableTreeNode {

  public readonly packages: PackageTreeUiNode[] = [];

  private readonly context: Context;

  constructor(projectType: ProjectTypeController, context: Context) {
    super();
    this.context = context;
    for (const packageType of projectType.packages) {
      this.createPackage(packageType);
    }
  }

  private createPackage(type: PackageTypeController): void {
    const package_ = new PackageTreeUiNode(type, this.context)
      .uiNodeAppendTo(this.collapsableTreeNodeChildren);
    this.packages.push(package_);
  }
}
