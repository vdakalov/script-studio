import Context from "./context";

export default class UiNode<T extends HTMLElement> {

  public readonly context: Context;

  public readonly uiNodeId: string = Math.random().toString(36);

  public readonly uiNodeElement: T;

  public get uiNodeChildren(): Readonly<UiNode<HTMLElement>[]> {
    return this._uiNodeChildren;
  }

  public get uiNodeParent(): UiNode<HTMLElement> | undefined {
    return this._uiNodeParent;
  }

  private readonly _uiNodeChildren: UiNode<HTMLElement>[] = [];

  private _uiNodeParent: UiNode<HTMLElement> | undefined = undefined;

  constructor(context: Context, tagName: keyof HTMLElementTagNameMap) {

    this.uiNodeElement = window.document.createElement(tagName) as T;
    this.uiNodeElement.className = this
      .uiNodeGetAscendantsPrototypes()
      .reverse()
      .map(object => object.constructor.name)
      .join(' ');
  }

  protected uiNodeGetAscendantsPrototypes(): Object[] {
    const objects: Object[] = [];
    let proto: Object = this;
    while ((proto = Object.getPrototypeOf(proto)) !== null && proto.constructor !== Object) {
      objects.push(proto);
    }
    return objects;
  }

  protected uiNodeCreateChildren<K extends keyof HTMLElementTagNameMap>(tagName: K): HTMLElementTagNameMap[K] {
    return this.uiNodeElement.appendChild(window.document.createElement(tagName));
  }

  public uiNodeInit(initializer: (element: T) => void): this {
    initializer(this.uiNodeElement);
    return this;
  }

  public uiNodeClass(tokens: string[], reset: boolean = false): this {
    if (reset) {
      this.uiNodeElement.classList.remove(...this.uiNodeElement.classList.values());
    }
    this.uiNodeElement.classList.add(...tokens);
    return this;
  }

  public uiNodeAppend<T extends UiNode<HTMLElement>>(node: T, before?: UiNode<HTMLElement> | number): T {
    if (typeof before === 'number' && this.uiNodeElement.children.length > before) {
      this.uiNodeElement.insertBefore(node.uiNodeElement, this.uiNodeElement.children.item(before));
      this._uiNodeChildren.splice(before, 0, node);
    } else if (before instanceof UiNode && before.uiNodeElement.parentElement === this.uiNodeElement) {
      this.uiNodeElement.insertBefore(node.uiNodeElement, before.uiNodeElement);
      const index = this._uiNodeChildren.indexOf(before);
      if (index !== -1) {
        this._uiNodeChildren.splice(index, 0, node);
      }
    } else {
      this.uiNodeElement.appendChild(node.uiNodeElement);
      this._uiNodeChildren.push(node);
    }
    node._uiNodeParent = this;
    return node;
  }

  public uiNodeAppendAll<T extends UiNode<HTMLElement>>(nodes: T[], before?: UiNode<HTMLElement> | number): T[] {
    for (const node of nodes) {
      this.uiNodeAppend(node, before);
      if (typeof before === 'number') {
        before++;
      }
    }
    return nodes;
  }

  public uiNodeAppendTo(parent: UiNode<HTMLElement>, before?: UiNode<HTMLElement> | number): this {
    parent.uiNodeAppend(this, before);
    return this;
  }

  public uiNodeRemove(child?: UiNode<HTMLElement>): void {
    if (child === undefined) {
      if (this.uiNodeParent !== undefined && this.uiNodeElement.parentElement !== null) {
        const index = this.uiNodeParent.uiNodeChildren.indexOf(this);
        if (index !== -1) {
          this.uiNodeParent._uiNodeChildren.splice(index, 1);
          this._uiNodeParent = undefined;
          this.uiNodeElement.parentElement
            .removeChild(this.uiNodeElement);
        }
      }
      return;
    }
    child.uiNodeRemove();
  }

  public uiNodeRemoveAll(): void {
    this.uiNodeElement.textContent = '';
  }
}
