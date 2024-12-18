import CollapsableTreeNode from '../../ui/tree/nodes/collapsable';
import ModuleModel from './model';

export default class ModuleView extends CollapsableTreeNode {

  private readonly moduleModel: ModuleModel;

  constructor(moduleModel: ModuleModel) {
    super();
    this.moduleModel = moduleModel;
    this.label.text = moduleModel.name.join('-');
  }
}
