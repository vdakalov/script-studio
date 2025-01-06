import { createTypeId } from '../../libs/type';
import TypeController from '../../libs/type/controller';
import { Type as ProjectType } from '.';
import PackageTypeController from '../package/controller';

export enum Event {
  PackageAppended = 'PackageAppended'
}

type EM = {
  [Event.PackageAppended]: [PackageTypeController];
};

export default class ProjectTypeController extends TypeController<ProjectType, EM> {

  public static create(name: string, description: string = '', packages: ProjectType['packages'] = []): ProjectTypeController {
    return new this({
      tid: createTypeId(),
      name,
      description,
      packages
    });
  }

  public packages: PackageTypeController[] = [];

  constructor(projectType: ProjectType) {
    super(projectType);
    for (const packageType of projectType.packages) {
      this.packages.push(new PackageTypeController(packageType));
    }
  }

  public appendPackage(packageTypeController: PackageTypeController): PackageTypeController {
    this.debugLog('appendPackage', arguments);
    this.type.packages.push(packageTypeController.type);
    this.packages.push(packageTypeController);
    this.emitAsync(Event.PackageAppended, packageTypeController);
    return packageTypeController;
  }
}
