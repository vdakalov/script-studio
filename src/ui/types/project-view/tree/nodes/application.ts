import CollapsableTreeNode from '../../../../custom/tree/nodes/collapsable';
import Context from '../../../../../libs/context';
import ProjectTypeController from '../../../../../types/project/controller';

export default class ApplicationTreeNodeUiNode extends CollapsableTreeNode {
  constructor(context: Context) {
    super();

    for (const project of context.type.projects) {
      this.createProject(project);
    }
  }

  private createProject(project: ProjectTypeController): void {

  }
}
