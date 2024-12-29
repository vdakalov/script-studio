import { createTypeId } from '../../libs/type';
import TypeController from '../../libs/type/controller';
import { Type as ProjectType } from '.';
import PackageController from '../package/controller';
import PackageTypeController from '../package/controller';

export default class ProjectTypeController extends TypeController<ProjectType> {

  public packages: PackageController[] = [];

  constructor(projectType: ProjectType) {
    super(projectType);
    for (const packageType of projectType.packages) {
      this.packages.push(new PackageTypeController(packageType));
    }
  }

  public createPackage(name: string, version: string): PackageController {
    const controller = new PackageController({
      tid: createTypeId(),
      data: {
        name, version
      },
      classes: []
    });
    this.type.packages.push(controller.type);
    this.packages.push(controller);
    return controller;
  }
}
