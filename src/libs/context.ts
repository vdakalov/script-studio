import ContextMenu from './context-menu';
import TreeNodes from '../ui/tree/nodes';
import ProjectsModel from '../nodes/projects/model';
import { cid } from './model';
import ProjectsView from '../nodes/projects/view';
import ContextMenuUi from '../ui/context-menu';
import AlertModalWindow from './modal-windows/alert';
import PromptModalWindow from './modal-windows/prompt';
import ConfirmModalWindow from './modal-windows/confirm';

export default class Context {
  public readonly alert: AlertModalWindow = new AlertModalWindow();
  public readonly confirm: ConfirmModalWindow = new ConfirmModalWindow();
  public readonly prompt: PromptModalWindow = new PromptModalWindow();
  public readonly contextMenu: ContextMenu = new ContextMenu(new ContextMenuUi());
  public readonly rootView: TreeNodes = new TreeNodes();
  public readonly projectsModel: ProjectsModel = [{
    id: cid(),
    name: 'My Project',
    description: 'My first project',
    packages: [{
      id: cid(),
      data: {
        name: 'gears-package',
        version: '0.0.1-rc1',
        description: 'Test package',
        main: './index.js'
      },
      modules: []
    }]
  }];
  public readonly projectsView: ProjectsView = new ProjectsView(this.projectsModel, this);
}
