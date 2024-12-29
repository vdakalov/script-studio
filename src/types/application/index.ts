import { TypeId } from '../../libs/type'
import { Type as ProjectType } from '../project';

export type Type = {
  tid: TypeId;
  projects: ProjectType[];
};
