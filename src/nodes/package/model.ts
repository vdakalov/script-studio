import ModuleModel from '../module/model';
import { Model as ClassModel } from '../class/model';
import { cid } from '../../libs/model';

type PackageData = {
  name: string;
  version: string;
  description?: string;
  main?: string;
};

type PackageModel = {
  id: string;
  data: PackageData;
  modules: ModuleModel[];
  classes: ClassModel[];
};

export default PackageModel;

export function create(name: string): PackageModel {
  return {
    id: cid(),
    data: {
      name,
      version: '0.0.1',
      description: ''
    },
    modules: [],
    classes: []
  };
}
