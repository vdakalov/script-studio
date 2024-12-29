import { createTypeId } from '../../libs/type';
import { Type as ClassType } from '.';
import TypeController from '../../libs/type/controller';
import ConstructorTypeController from './constructor/controller';
import PropertyTypeController from './property/controller';
import MethodTypeController from './method/controller';

export default class ClassTypeController extends TypeController<ClassType> {

  public constructor_: ConstructorTypeController | undefined  = undefined;

  public properties: PropertyTypeController[] = [];

  public methods: MethodTypeController[] = [];

  constructor(classType: ClassType) {
    super(classType);
    if (classType.constructor !== undefined) {
      this.constructor_ = new ConstructorTypeController(classType.constructor);
    }
    if (classType.properties !== undefined) {
      for (const propertyType of classType.properties) {
        this.properties.push(new PropertyTypeController(propertyType));
      }
    }
    if (classType.methods !== undefined) {
      for (const methodType of classType.methods) {
        this.methods.push(new MethodTypeController(methodType));
      }
    }
  }

  public createConstructor(): ConstructorTypeController {
    const controller = new ConstructorTypeController({ tid: createTypeId() });
    this.type.constructor = controller.type;
    this.constructor_ = controller;
    return controller;
  }

  public createProperty(name: string): PropertyTypeController {
    const controller = new PropertyTypeController({ tid: createTypeId(), name });
    (this.type.properties || (this.type.properties = []))
      .push(controller.type);
    this.properties.push(controller);
    return controller;
  }

  public createMethod(name: string): MethodTypeController {
    const controller = new MethodTypeController({ tid: createTypeId(), name });
    (this.type.methods || (this.type.methods = []))
      .push(controller.type);
    this.methods.push(controller);
    return controller;
  }
}
