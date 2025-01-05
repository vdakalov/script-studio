import TypeController from '../../libs/type/controller';
import { Type as ClassType } from '.';
import { Type as PropertyType } from './property';
import { Type as MethodType } from './method';
import ConstructorTypeController from './constructor/controller';
import PropertyTypeController from './property/controller';
import MethodTypeController from './method/controller';

export default class ClassTypeController extends TypeController<ClassType> {

  public constructor_: ConstructorTypeController | undefined  = undefined;

  public properties: PropertyTypeController[] = [];

  public methods: MethodTypeController[] = [];

  constructor(classType: ClassType) {
    super(classType);
    this.debugLog(this.constructor.name, arguments);

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

  public setConstructor(constructorTypeController: ConstructorTypeController): ConstructorTypeController {
    this.debugLog(this.setConstructor.name, arguments);
    this.type.constructor = constructorTypeController.type;
    return this.constructor_ = constructorTypeController;
  }

  public createProperty(propertyType: PropertyType): PropertyTypeController {
    this.debugLog(this.createProperty.name, arguments);
    const controller = new PropertyTypeController(propertyType);
    (this.type.properties || (this.type.properties = []))
      .push(controller.type);
    this.properties.push(controller);
    return controller;
  }

  public createMethod(methodType: MethodType): MethodTypeController {
    this.debugLog(this.createMethod.name, arguments);
    const controller = new MethodTypeController(methodType);
    (this.type.methods || (this.type.methods = []))
      .push(controller.type);
    this.methods.push(controller);
    return controller;
  }
}
