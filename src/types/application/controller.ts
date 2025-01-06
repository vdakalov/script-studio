import { createTypeId } from '../../libs/type';
import TypeController from '../../libs/type/controller';
import { Type as ApplicationType } from '.';
import ProjectTypeController from '../project/controller';

export enum Event {
  ProjectAppended = 'ProjectAppended'
}

type EM = {
  [Event.ProjectAppended]: [ProjectTypeController]
};

export default class ApplicationTypeController extends TypeController<ApplicationType, EM> {

  public static create(): ApplicationTypeController {
    return new this({ tid: createTypeId(), projects: [] });
  }

  public readonly projects: ProjectTypeController[] = [];

  constructor(applicationType: ApplicationType) {
    super(applicationType);
    for (const projectType of applicationType.projects) {
      this.projects.push(new ProjectTypeController(projectType));
    }
  }

  public appendProject(projectTypeController: ProjectTypeController): ProjectTypeController {
    this.debugLog('appendProject', arguments);
    this.type.projects.push(projectTypeController.type);
    this.projects.push(projectTypeController);
    this.emitAsync(Event.ProjectAppended, projectTypeController);
    return projectTypeController;
  }
}
