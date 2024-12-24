import UiNode from '../../libs/ui';
import DivUiNode from '../html/div';
import ListTabsUiNode from './list';
import TabUiNode from './list/tab';
import TabsContentUiNode from './content';

type Item = {
  title: string;
  tab: TabUiNode;
  content: UiNode<HTMLElement>;
};

export default class TabsUiNode extends DivUiNode {

  private readonly list: ListTabsUiNode = new ListTabsUiNode()
    .uiNodeAppendTo(this);

  private readonly content: TabsContentUiNode = new TabsContentUiNode()
    .uiNodeAppendTo(this);

  private readonly items: Item[] = [];

  private active: Item | undefined = undefined;

  constructor() {
    super();
    this.list.uiNodeElement.addEventListener('click', this.onClick.bind(this));
  }

  private onClick(event: MouseEvent): void {
    if (event.target instanceof HTMLElement) {
      let element = event.target;
      while (element.tagName !== 'LI' && element.parentElement !== null) {
        element = element.parentElement;
      }
      if (element.tagName === 'LI') {
        this.activateTabByLIElement(element as HTMLLIElement);
      }
    }
  }

  private activateTabByLIElement(element: HTMLLIElement): void {
    const item = this.items.find(({ tab }) => tab.uiNodeElement === element);
    if (item !== undefined) {
      this.activateItem(item);
    }
  }

  private activateItem(item: Item): void {
    if (this.active !== undefined) {
      this.active.tab.uiNodeElement.classList.remove('active');
      this.content.uiNodeRemoveAll();
    }
    item.tab.uiNodeElement.classList.add('active');
    this.content.uiNodeAppend(item.content);
    this.active = item;
  }

  public add(title: string, content: UiNode<HTMLElement>): this {
    const tab = new TabUiNode(title)
      .uiNodeAppendTo(this.list);
    const item = { title, tab, content };
    this.items.push(item);
    if (this.items.length === 1) {
      this.activateItem(item);
    }
    return this;
  }
}
