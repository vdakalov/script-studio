import CollapsableTreeNode from '../../../../custom/tree/nodes/collapsable';
import PackageTypeController from '../../../../../types/package/controller';
import Context from '../../../../../libs/context';
import ClassTreeNodeUiNode from './class';

export default class PackageTreeUiNode extends CollapsableTreeNode {

  public static create(context: Context, name: string, version?: string, description: string = ''): PackageTreeUiNode {
    const type = PackageTypeController.create(name, version, description);
    return new this(type, context);
  }

  public readonly classes: ClassTreeNodeUiNode[] = [];

  private readonly type: PackageTypeController;

  private readonly context: Context;

  constructor(type: PackageTypeController, context: Context) {
    super();
    this.type = type;
    this.context = context;

    for (const classType of type.classes) {
      const class_ = new ClassTreeNodeUiNode(classType)
        .uiNodeAppendTo(this.collapsableTreeNodeChildren);
      this.classes.push(class_);
    }
  }
}
