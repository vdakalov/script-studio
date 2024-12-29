import CollapsableTreeNode from '../../../ui/custom/tree/nodes/collapsable';
import { Model } from '../model';
import Context from '../../../libs/context';

export default class ClassTreeNode extends CollapsableTreeNode {

  private readonly model: Model;

  private readonly context: Context;

  constructor(model: Model, context: Context) {
    super();
    this.model = model;
    this.context = context;
    this.label.text = model.name;
  }
}
