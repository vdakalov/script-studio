import { createTypeId } from './type';
import ContextMenu from './context-menu';
import ContextMenuUi from '../ui/custom/context-menu';
import AlertModalWindow from './modal-windows/alert';
import PromptModalWindow from './modal-windows/prompt';
import ConfirmModalWindow from './modal-windows/confirm';
import ApplicationTypeController from '../types/application/controller';
import ApplicationTypeUiNode from '../ui/types/application';

export default class Context {
  public alert: AlertModalWindow = new AlertModalWindow();
  public confirm: ConfirmModalWindow = new ConfirmModalWindow();
  public prompt: PromptModalWindow = new PromptModalWindow();
  public contextMenu: ContextMenu = new ContextMenu(new ContextMenuUi());
  public type: ApplicationTypeController = new ApplicationTypeController({
    tid: createTypeId(),
    projects: [{
      tid: createTypeId(),
      name: 'My First Project',
      description: 'Project description',
      packages: [
        {
          tid: createTypeId(),
          data: {
            name: 'my-package',
            version: '0.1.0',
            description: 'just my package',
            main: './index.js'
          },
          classes: [{
            tid: createTypeId(),
            name: 'MyClass',
            constructor: undefined // I don't know, ts-types collision mb \(o.o)/
          }]
        }
      ]
    }]
  });
  public ui: ApplicationTypeUiNode = new ApplicationTypeUiNode(this.type, this);

  // public readonly rootView: TreeNodes = new TreeNodes();
  // public readonly projectsModel: ProjectsModel = [{
  //   id: cid(),
  //   name: 'My Project',
  //   description: 'My first project',
  //   packages: [{
  //     id: cid(),
  //     data: {
  //       name: 'gears-package',
  //       version: '0.0.1-rc1',
  //       description: 'Test package',
  //       main: './index.js'
  //     },
  //     modules: []
  //   j}]
  // }];
  // public readonly projectsView: ApplicationView = new ApplicationView(this.projectsModel, this);
}
