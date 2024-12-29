import { TypeId } from '../../libs/type';
import { Type as ClassType } from '../class';

export type Type = {
  tid: TypeId;
  data: {
    name: string;
    version: string;
    description?: string;
    main?: string;
  };
  classes: ClassType[];
};
