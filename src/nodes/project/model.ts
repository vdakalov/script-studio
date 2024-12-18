import PackageModel from '../package/model';
import { cid } from '../../libs/model';

type ProjectModel = {
  id: string;
  name: string;
  description: string;
  packages: PackageModel[];
};

export default ProjectModel;

export function create(name: string, description: string = '', packages: PackageModel[] = [], id: string = cid()): ProjectModel {
  return { id, name, description, packages };
}
