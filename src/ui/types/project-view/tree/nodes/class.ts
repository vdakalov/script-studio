import CollapsableTreeNode from '../../../../custom/tree/nodes/collapsable';
import ClassTypeController from '../../../../../types/class/controller';

export default class ClassTreeNodeUiNode extends CollapsableTreeNode {

  public static create(name: string): ClassTreeNodeUiNode {
    const controller = ClassTypeController.create(name);
    return new this(controller);
  }

  public type: ClassTypeController;

  constructor(classType: ClassTypeController) {
    super();
    this.type = classType;
  }
}
