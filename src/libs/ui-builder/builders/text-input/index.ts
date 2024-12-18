import UiBuilder from '../../index';
import { EventHandlerMap } from '../../../../ui/html/input';
import TextInputUiNode from '../../../../ui/html/input/text';

export default class TextInputBuilder extends UiBuilder<TextInputUiNode> {
  constructor(initial?: string, events?: EventHandlerMap) {
    super(new TextInputUiNode(initial, events));
  }
}
