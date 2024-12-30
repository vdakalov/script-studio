import CollapsableTreeNode from '../../../../custom/tree/nodes/collapsable';
import PackageTypeController from '../../../../../types/package/controller';
import Context from '../../../../../libs/context';
import ClassTypeController from '../../../../../types/class/controller';

export default class PackageTreeUiNode extends CollapsableTreeNode {

  private readonly context: Context;

  constructor(packageType: PackageTypeController, context: Context) {
    super();
    this.context = context;

    for (const classType of packageType.classes) {
      this.createClass(classType);
    }
  }

  public createClass(classType: ClassTypeController): void {
    const controller = new ClasType
    this.collapsableTreeNodeChildren.uiNodeAppend();
  }
}
