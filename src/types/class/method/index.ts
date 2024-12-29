import { TypeId } from '../../../libs/type';
import { Access } from '../access';
import { Type as ArgumentsType } from './arguments'

export type Type = {
  tid: TypeId;
  name: string;
  arguments?: ArgumentsType;
  type?: unknown;
  static?: boolean;
  abstract?: boolean;
  access?: Access;
  initializer?: unknown;
};
