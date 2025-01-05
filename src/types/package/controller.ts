import TypeController from '../../libs/type/controller';
import { Type as PackageType } from '.';
import ClassController from '../class/controller';
import ClassTypeController from '../class/controller';

export default class PackageTypeController extends TypeController<PackageType> {

  public classes: ClassController[] = [];

   constructor(packageType: PackageType) {
     super(packageType);
     this.debugLog(arguments);
     for (const classType of packageType.classes) {
       this.classes.push(new ClassTypeController(classType));
     }
   }

  public appendClass(classTypeController: ClassTypeController): ClassController {
    this.debugLog(arguments);
    this.type.classes.push(classTypeController.type);
    this.classes.push(classTypeController);
    return classTypeController;
  }
}
