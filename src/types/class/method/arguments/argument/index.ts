import { TypeId } from '../../../../../libs/type';

export type Type = {
  tid: TypeId;
  name: string;
  type?: unknown;
  initializer?: unknown;
};
