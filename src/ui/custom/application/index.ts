import DivUiNode from '../../html/div';
import ApplicationTypeController from '../../../types/application/controller';
import Context from '../../../libs/context';
import ProjectViewUiNode from '../../types/project-view';

export default class ApplicationTypeUiNode extends DivUiNode {

  public type: ApplicationTypeController;

  private readonly projectView: ProjectViewUiNode;

  constructor(type: ApplicationTypeController, context: Context) {
    super();
    this.type = type;
    this.projectView = new ProjectViewUiNode(context)
      .uiNodeAppendTo(this);
  }

  public mount(element: Node): void {
    element.appendChild(this.uiNodeElement);
  }
}
