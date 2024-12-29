import { createTypeId } from '../../libs/type';
import TypeController from '../../libs/type/controller';
import { Type as PackageType } from '.';
import ClassController from '../class/controller';
import ClassTypeController from '../class/controller';

export default class PackageTypeController extends TypeController<PackageType> {

  public classes: ClassController[] = [];

   constructor(packageType: PackageType) {
     super(packageType);
     for (const classType of packageType.classes) {
       this.classes.push(new ClassTypeController(classType));
     }
   }

  public createClass(name: string): ClassController {
    const controller = new ClassController({
      tid: createTypeId(),
      name,
      constructor: undefined // I don't know, ts-types collision mb \(o.o)/
    });
    this.type.classes.push(controller.type);
    this.classes.push(controller);
    return controller;
  }
}
