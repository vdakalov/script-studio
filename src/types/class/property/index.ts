import { TypeId } from '../../../libs/type';
import { Access } from '../access';

export type Type = {
  tid: TypeId;
  name: string;
  type?: unknown;
  static?: boolean;
  abstract?: boolean;
  getter?: boolean;
  setter?: boolean;
  readonly?: boolean;
  access?: Access;
  initializer?: unknown;
};
