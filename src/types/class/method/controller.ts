import { createTypeId } from '../../../libs/type';
import TypeController from '../../../libs/type/controller';
import { Type as MethodType } from '.';
import ArgumentsTypeController from './arguments/controller';

export default class MethodTypeController extends TypeController<MethodType> {

  public arguments: ArgumentsTypeController | undefined = undefined;

  constructor(methodType: MethodType) {
    super(methodType);
    if (methodType.arguments !== undefined) {
      this.arguments = new ArgumentsTypeController(methodType.arguments);
    }
  }
}
