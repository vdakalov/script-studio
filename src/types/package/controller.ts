import { createTypeId } from '../../libs/type';
import TypeController from '../../libs/type/controller';
import { Type as PackageType } from '.';
import ClassTypeController from '../class/controller';

export default class PackageTypeController extends TypeController<PackageType> {

  public static create(name: string, version: string = '0.1.0', description: string = ''): PackageTypeController {
    return new this({
      tid: createTypeId(),
      data: {
        name,
        version,
        description
      },
      classes: []
    });
  }

  public classes: ClassTypeController[] = [];

   constructor(packageType: PackageType) {
     super(packageType);
     this.debugLog('constructor', arguments);
     for (const classType of packageType.classes) {
       this.classes.push(new ClassTypeController(classType));
     }
   }

  public appendClass(classTypeController: ClassTypeController): ClassTypeController {
    this.debugLog('appendClass', arguments);
    this.type.classes.push(classTypeController.type);
    this.classes.push(classTypeController);
    return classTypeController;
  }
}
