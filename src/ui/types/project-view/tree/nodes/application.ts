import CollapsableTreeNode from '../../../../custom/tree/nodes/collapsable';
import Context from '../../../../../libs/context';
import ApplicationTypeController, { Event as ApplicationTypeControllerEvent } from '../../../../../types/application/controller';
import ProjectTreeNodeUiNode from './project';
import ProjectTypeController from '../../../../../types/project/controller';
import { MenuItem } from '../../../../../libs/context-menu';

export default class ApplicationTreeNodeUiNode extends CollapsableTreeNode {

  public readonly projects: ProjectTreeNodeUiNode[] = [];

  private readonly type: ApplicationTypeController;

  private readonly context: Context;

  private readonly menuItems: MenuItem[] = [
    {
      handler: this.onCreateProject.bind(this),
      text: 'New Project'
    }
  ];

  constructor(applicationTypeController: ApplicationTypeController, context: Context) {
    super();
    this.type = applicationTypeController;
    this.context = context;

    for (const projectType of this.type.projects) {
      const project = new ProjectTreeNodeUiNode(projectType, this.context)
        .uiNodeAppendTo(this.collapsableTreeNodeChildren);
      this.projects.push(project);
    }

    context.contextMenu.register(() => this.menuItems, [this.label.uiNodeElement]);

    this.type.on(ApplicationTypeControllerEvent.ProjectAppended, this.onProjectAppended.bind(this));
  }

  private onCreateProject(): void {
    this.context.prompt.open('New Project', 'Enter project name:', 'New Project', name => {
      if (name === undefined || name.length === 0) {
        return;
      }
      this.type.appendProject(ProjectTypeController.create(name));
    });
  }

  private onProjectAppended(projectTypeController: ProjectTypeController): void {
    const node = new ProjectTreeNodeUiNode(projectTypeController, this.context)
      .uiNodeAppendTo(this.collapsableTreeNodeChildren);
    this.projects.push(node);
  }
}
