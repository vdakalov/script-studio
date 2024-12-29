import { createTypeId } from '../../libs/type';
import TypeController from '../../libs/type/controller';
import { Type as ApplicationType } from '.';
import ProjectController from '../project/controller';

export default class ApplicationTypeController extends TypeController<ApplicationType> {

  public readonly projects: ProjectController[] = [];

  constructor(applicationType: ApplicationType = { tid: createTypeId(), projects: [] }) {
    super(applicationType);
    for (const project of applicationType.projects) {
      this.projects.push(new ProjectController(project));
    }
  }

  public createProject(name: string, description: string): ProjectController {
    const controller = new ProjectController({ tid: createTypeId(), name, description, packages: [] });
    this.type.projects.push(controller.type);
    this.projects.push(controller);
    return controller;
  }
}
