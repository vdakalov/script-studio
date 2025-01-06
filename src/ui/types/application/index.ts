import DivUiNode from '../../html/div';
import ApplicationTypeController from '../../../types/application/controller';
import Context from '../../../libs/context';
import ProjectViewUiNode from '../project-view';

export default class ApplicationTypeUiNode extends DivUiNode {

  private type: ApplicationTypeController;

  private projectView: ProjectViewUiNode;

  private readonly context: Context;

  constructor(type: ApplicationTypeController, context: Context) {
    super();
    this.type = type;
    this.context = context;
    this.projectView = new ProjectViewUiNode(type, context)
      .uiNodeAppendTo(this);
  }

  public mount(element: Node): void {
    element.appendChild(this.uiNodeElement);
  }
}
