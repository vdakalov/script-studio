import Context from './libs/context';

export default class Application {

  private readonly context: Context = new Context();

  constructor(parentNode: Node) {
    this.context.rootView.uiNodeAppend(this.context.projectsView);
    this.context.rootView.mount(parentNode);
  }
}
