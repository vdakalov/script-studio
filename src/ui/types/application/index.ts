import DivUiNode from '../../html/div';
import ApplicationTypeController from '../../../types/application/controller';
import Context from '../../../libs/context';

export default class ApplicationUiNode extends DivUiNode {

  public type: ApplicationTypeController;

  constructor(type: ApplicationTypeController, context: Context) {
    super();
    this.type = type;
  }

  public mount(element: Node): void {
    element.appendChild(this.uiNodeElement);
  }
}
