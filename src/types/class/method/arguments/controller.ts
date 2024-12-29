import { createTypeId } from '../../../../libs/type';
import TypeController from '../../../../libs/type/controller';
import { Type as ArgumentsType } from '.';
import ArgumentTypeController from './argument/controller';

export default class ArgumentsTypeController extends TypeController<ArgumentsType> {

  public readonly list: ArgumentTypeController[] = [];

  public createArgument(name: string, type?: string): ArgumentTypeController {
    const controller = new ArgumentTypeController({
      tid: createTypeId(),
      name, type
    });
    this.type.list.push(controller.type);
    this.list.push(controller);
    return controller;
  }
}
