import Context from '../../libs/context';
import ApplicationTypeController from '../../types/application/controller';
import ProjectTypeController from '../../types/project/controller';
import ProjectView from '../project/view';
import CollapsableTreeNode from '../../ui/custom/tree/nodes/collapsable';
import { MenuItem } from '../../libs/context-menu';

export default class ApplicationView extends CollapsableTreeNode {

  private ctrl: ApplicationTypeController;

  private context: Context;

  // todo need typed children
  private readonly projectsViews: ProjectView[] = [];

  private readonly menu: MenuItem[] = [{
    text: 'New Project',
    handler: this.onNewProject.bind(this)
  }];

  constructor(ctrl: ApplicationTypeController, context: Context) {
    super();
    this.ctrl = ctrl;
    this.context = context;

    this.label.text = 'Application';

    context.contextMenu
      .register(() => this.menu, [this.label.uiNodeElement]);

    for (const project of this.ctrl.projects) {
      this.add(project);
    }
  }

  private onNewProject(): void {
    this.context.prompt.open('New Project', 'Enter project name:', 'Untitled Project', name => {
      if (name === undefined || name.length === 0) {
        return undefined;
      }
      // const projectModel = createProjectModel(name);
      // this.add(projectModel);
    });
  }

  public add(projectCtrl: ProjectTypeController): void {
    // this.collapsableTreeNodeChildren.uiNodeAppend(new ProjectView(projectModel, this.context));
  }

  // public remove(projectModel: ProjectModel): void {
    // todo how children may delete themselves?
    // const index = this.uiNodeChildren;
  // }
}
