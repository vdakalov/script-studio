import CollapsableTreeNode from '../../../../custom/tree/nodes/collapsable';
import PackageTypeController from '../../../../../types/package/controller';
import Context from '../../../../../libs/context';
import ClassTypeController from '../../../../../types/class/controller';
import ClassUiNode from './class';

export default class PackageTreeUiNode extends CollapsableTreeNode {

  public readonly classes: ClassUiNode[] = [];

  private readonly type: PackageTypeController;

  private readonly context: Context;

  constructor(type: PackageTypeController, context: Context) {
    super();
    this.type = type;
    this.context = context;

    for (const classType of type.classes) {
      this.createClass(classType);
    }
  }

  public createClass(type: ClassTypeController): void {
    const class_ = new ClassUiNode(type)
      .uiNodeAppendTo(this.collapsableTreeNodeChildren);
    this.classes.push(class_);
  }
}
