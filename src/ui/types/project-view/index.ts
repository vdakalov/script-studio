import DivUiNode from '../../html/div';
import Context from '../../../libs/context';
import ProjectViewTreeUiNode from './tree/nodes/application';

export default class ProjectViewUiNode extends DivUiNode {

  private readonly root: ProjectViewTreeUiNode;

  constructor(context: Context) {
    super();
    this.root = new ProjectViewTreeUiNode(context)
      .uiNodeAppendTo(this);
  }
}
