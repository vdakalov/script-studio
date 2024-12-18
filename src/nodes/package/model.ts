import ModuleModel from '../module/model';
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
    modules: []
  };
}
