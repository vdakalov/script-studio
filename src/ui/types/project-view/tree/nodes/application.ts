import CollapsableTreeNode from '../../../../custom/tree/nodes/collapsable';
import Context from '../../../../../libs/context';
import ProjectTypeController from '../../../../../types/project/controller';
import ApplicationTypeController from '../../../../../types/application/controller';
import ProjectTreeNodeUiNode from './project';

export default class ApplicationTreeNodeUiNode extends CollapsableTreeNode {

  public readonly projects: ProjectTreeNodeUiNode[] = [];

  private readonly type: ApplicationTypeController;

  private readonly context: Context;

  constructor(applicationTypeController: ApplicationTypeController, context: Context) {
    super();

    this.type = applicationTypeController;
    this.context = context;

    for (const project of this.type.projects) {
      this.createProject(project);
    }
  }

  private createProject(type: ProjectTypeController): void {
    const project = new ProjectTreeNodeUiNode(type, this.context)
      .uiNodeAppendTo(this.collapsableTreeNodeChildren);
    this.projects.push(project);
  }
}
