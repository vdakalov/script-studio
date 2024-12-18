import Context from '../../libs/context';
import ProjectsModel from './model';
import ProjectModel, { create as createProjectModel } from '../project/model';
import ProjectView from '../project/view';
import CollapsableTreeNode from '../../ui/tree/nodes/collapsable';
import { MenuItem } from '../../libs/context-menu';

export default class ProjectsView extends CollapsableTreeNode {

  public readonly projectsModel: ProjectsModel;

  private readonly context: Context;

  // todo need typed children
  private readonly projectsViews: ProjectView[] = [];

  private readonly menu: MenuItem[] = [{
    text: 'New Project',
    handler: this.onNewProject.bind(this)
  }];

  constructor(projectsModel: ProjectsModel = [], context: Context) {
    super();
    this.context = context;
    this.projectsModel = projectsModel;
    this.label.text = 'Projects';

    context.contextMenu
      .register(() => this.menu, [this.label.uiNodeElement]);

    for (const projectModel of projectsModel) {
      this.add(projectModel)
    }
  }

  private onNewProject(): void {
    this.context.prompt.open('New Project', 'Enter project name:', 'Untitled Project', name => {
      if (name === undefined || name.length === 0) {
        return undefined;
      }
      const projectModel = createProjectModel(name);
      this.add(projectModel);
    });
  }

  public add(projectModel: ProjectModel): void {
    this.children.uiNodeAppend(new ProjectView(projectModel, this.context));
  }

  public remove(projectModel: ProjectModel): void {
    // todo how children may delete themselves?
    const index = this.uiNodeChildren;
  }
}
