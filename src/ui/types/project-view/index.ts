import DivUiNode from '../../html/div';
import Context from '../../../libs/context';
import ProjectViewTreeUiNode from './tree/nodes/application';
import ApplicationTypeController from '../../../types/application/controller';

export default class ProjectViewUiNode extends DivUiNode {

  private readonly type: ApplicationTypeController;

  private readonly tree: ProjectViewTreeUiNode;

  constructor(type: ApplicationTypeController, context: Context) {
    super();
    this.type = type;
    this.tree = new ProjectViewTreeUiNode(type, context)
      .uiNodeAppendTo(this);
  }
}
