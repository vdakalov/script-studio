import CollapsableTreeNode from '../../../../custom/tree/nodes/collapsable';
import ClassTypeController from '../../../../../types/class/controller';

export default class ClassUiNode extends CollapsableTreeNode {

  public type: ClassTypeController;

  constructor(classType: ClassTypeController) {
    super();
    this.type = classType;
  }
}
