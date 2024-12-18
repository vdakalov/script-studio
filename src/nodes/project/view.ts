import CollapsableTreeNode from '../../ui/tree/nodes/collapsable';
import ProjectModel from './model';
import PackageView from '../package/view';
import Context from '../../libs/context';
import { MenuItem } from '../../libs/context-menu';
import PackageModel, { create as createPackageModel } from '../package/model';
import PropertiesModalWindow from './modal-windows/properties';

export default class ProjectView extends CollapsableTreeNode {

  private readonly projectModel: ProjectModel;

  private readonly context: Context;

  private readonly propertiesModalWindow: PropertiesModalWindow;

  private readonly menu: MenuItem[] = [
    {
      text: 'New Package',
      handler: this.onNewPackage.bind(this)
    },
    {
      text: 'Rename',
      handler: this.onRename.bind(this)
    },
    {
      text: 'Properties',
      handler: this.onProperties.bind(this),
    },
    {
      text: 'Delete',
      handler: this.onDelete.bind(this)
    }
  ];

  constructor(projectModel: ProjectModel, context: Context) {
    super();
    this.projectModel = projectModel;
    this.context = context;
    this.propertiesModalWindow = new PropertiesModalWindow();
    this.label.text = projectModel.name;

    context.contextMenu.register(() => this.menu, [this.label.uiNodeElement]);

    for (const packageModel of projectModel.packages) {
      this.addPackage(packageModel);
    }
  }

  private addPackage(packageModel: PackageModel): void {
    this.children.uiNodeAppend(new PackageView(packageModel, this.context));
  }

  private setName(name: string): void {
    this.projectModel.name = name;
    this.label.text = name;
  }

  private onRename(): void {
    this.context.prompt.open(`Rename project "${this.projectModel.name}"`,
      'Enter new project name:', this.projectModel.name, name => {
        if (name !== undefined && name.length !== 0 && name !== this.projectModel.name) {
          this.setName(name);
        }
      });
  }

  private onDelete(): void {
    this.context.alert.open('Caution!', 'Feature is not implemented!');
  }

  private onNewPackage(): void {
    this.context.prompt.open('New Package', 'Package name:', 'untitled_package', name => {
      if (name !== undefined && name.length !== 0) {
        const packageModel = createPackageModel(name);
        this.addPackage(packageModel);
      }
    });
  }

  private onProperties(): void {
    this.propertiesModalWindow.open(this.projectModel, fields => {
      if (fields !== undefined) {
        if (fields.name !== this.projectModel.name) {
          this.setName(fields.name);
        }
        if (fields.description !== this.projectModel.description) {
          this.projectModel.description = fields.description;
        }
      }
    });

    // const inputId = new TextInputUiNode(this.projectModel.id);
    // inputId.uiNodeElement.readOnly = true;
    // const controlId = new ControlUiNode('ID:', [inputId]);
    //
    // const inputName = new TextInputUiNode(this.projectModel.name);
    // const controlName = new ControlUiNode('Name:', [inputName]);
    //
    // this.context.modalWindow.open(`Properties "${this.projectModel.name}"`, [
    //   controlId,
    //   controlName
    // ]);
  }
}

