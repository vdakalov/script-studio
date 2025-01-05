import TypeController from '../../libs/type/controller';
import { Type as ProjectType } from '.';
import PackageTypeController from '../package/controller';

export default class ProjectTypeController extends TypeController<ProjectType> {

  public packages: PackageTypeController[] = [];

  constructor(projectType: ProjectType) {
    super(projectType);
    this.debugLog(arguments);
    for (const packageType of projectType.packages) {
      this.packages.push(new PackageTypeController(packageType));
    }
  }

  public appendPackage(packageTypeController: PackageTypeController): PackageTypeController {
    this.debugLog(arguments);
    this.type.packages.push(packageTypeController.type);
    this.packages.push(packageTypeController);
    return packageTypeController;
  }
}
