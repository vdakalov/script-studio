import { TypeId } from '../../libs/type';
import { Type as PackageType } from '../package';

export type Type = {
  tid: TypeId;
  name: string;
  description: string;
  packages: PackageType[];
};
