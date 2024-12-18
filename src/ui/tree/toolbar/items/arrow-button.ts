import ToolbarItem from '../item';

export default class ArrowButtonToolbarItem extends ToolbarItem<HTMLButtonElement> {
  constructor(label: string, clickHandler: () => void) {
    super('button');
    this.itemElement.textContent = label;
    this.itemElement.addEventListener('click', clickHandler);
  }
}
