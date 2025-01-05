import { createTypeId } from '../../libs/type';
import TypeController from '../../libs/type/controller';
import { Type as ApplicationType } from '.';
import ProjectTypeController from '../project/controller';

export default class ApplicationTypeController extends TypeController<ApplicationType> {

  public readonly projects: ProjectTypeController[] = [];

  constructor(applicationType: ApplicationType = { tid: createTypeId(), projects: [] }) {
    super(applicationType);
    this.debugLog(arguments);
    for (const project of applicationType.projects) {
      this.projects.push(new ProjectTypeController(project));
    }
  }

  public appendProject(projectTypeController: ProjectTypeController): ProjectTypeController {
    this.debugLog(arguments);
    this.type.projects.push(projectTypeController.type);
    this.projects.push(projectTypeController);
    return projectTypeController;
  }
}
