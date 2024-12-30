import CollapsableTreeNode from '../../../../custom/tree/nodes/collapsable';
import Context from '../../../../../libs/context';
import PackageTypeController from '../../../../../types/package/controller';
import ProjectTypeController from '../../../../../types/project/controller';
import PackageTreeNode from '../../../../../nodes/package/ui/tree-node';

export default class ProjectTreeNodeUiNode extends CollapsableTreeNode {

  private readonly context: Context;

  constructor(projectType: ProjectTypeController, context: Context) {
    super();
    this.context = context;
    for (const packageType of projectType.packages) {
      this.createPackage(packageType);
    }
  }

  private createPackage(packageType: PackageTypeController): void {
    const packgeUiNode = new PackageTreeNode()
  }
}
