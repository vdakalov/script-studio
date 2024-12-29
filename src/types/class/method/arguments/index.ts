import { TypeId } from '../../../../libs/type';
import { Type as ArgumentType } from './argument';

export type Type = {
  tid: TypeId;
  list: ArgumentType[];
  optional?: number; // how many arguments are optional from end of the list, none by default
};
