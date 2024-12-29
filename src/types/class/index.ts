import { TypeId } from '../../libs/type';
import { Type as ConstructorType } from './constructor';
import { Type as PropertyType } from './property';
import { Type as MethodType } from './method';

export type Type = {
  tid: TypeId; // type id
  name: string; // class name
  constructor?: ConstructorType;
  properties?: PropertyType[];
  methods?: MethodType[];
  abstract?: boolean;
  extends?: unknown;
  implements?: unknown[];
};
