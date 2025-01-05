import DivUiNode from '../../html/div';
import { createTypeId } from '../../../libs/type';
import ApplicationTypeController from '../../../types/application/controller';
import Context from '../../../libs/context';
import ProjectViewUiNode from '../project-view';
import { Type as ProjectType } from '../../../types/project';
import ProjectTypeController from '../../../types/project/controller';
import { MenuItem } from '../../../libs/context-menu';
import ProjectTreeNodeUiNode from '../project-view/tree/nodes/project';

export default class ApplicationTypeUiNode extends DivUiNode {

  private type: ApplicationTypeController;

  private projectView: ProjectViewUiNode;

  private readonly projects: ProjectTreeNodeUiNode[] = [];

  private readonly context: Context;

  private readonly menuItems: MenuItem[] = [
    {
      handler: this.onCreateProject.bind(this),
      text: 'New Project'
    }
  ];

  constructor(type: ApplicationTypeController, context: Context) {
    super();
    this.type = type;
    this.context = context;
    this.projectView = new ProjectViewUiNode(type, context)
      .uiNodeAppendTo(this);

    context.contextMenu.register(() => this.menuItems, [this.uiNodeElement]);
  }

  private onCreateProject(): void {
    this.context.prompt.open('New Project', 'Enter project name:', 'New Project', name => {
      if (name === undefined || name.length === 0) {
        return;
      }
      this.createProject(name);
    });
  }

  public mount(element: Node): void {
    element.appendChild(this.uiNodeElement);
  }

  public createProject(name: string): void {
    const type: ProjectType = {
      tid: createTypeId(),
      name,
      description: '',
      packages: []
    };
    const projectTypeController = new ProjectTypeController(type);
    const ui = new ProjectTreeNodeUiNode(projectTypeController, this.context)
      .uiNodeAppendTo(this.projectView);
    this.type.appendProject(projectTypeController);
    this.projects.push(ui);
  }
}
