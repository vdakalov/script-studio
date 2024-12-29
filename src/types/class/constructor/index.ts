import { Access } from '../access';
import { TypeId } from '../../../libs/type';
import { Type as ArgumentsType } from '../method/arguments';

export type Type = {
  tid: TypeId;
  arguments?: ArgumentsType;
  access?: Access;
  initializer?: unknown;
};
