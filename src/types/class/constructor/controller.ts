import TypeController from '../../../libs/type/controller';
import { Type as ConstructorType } from '.';
import ArgumentsTypeController from '../method/arguments/controller';

export default class ConstructorTypeController extends TypeController<ConstructorType> {

  public arguments: ArgumentsTypeController | undefined = undefined;

  constructor(constructorType: ConstructorType) {
    super(constructorType);
    if (constructorType.arguments !== undefined) {
      this.arguments = new ArgumentsTypeController(constructorType.arguments);
    }
  }
}
