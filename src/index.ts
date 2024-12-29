import Context from './libs/context';

export default class Application {

  private context: Context = new Context();

  constructor(parentNode: Node) {
    this.context.ui.mount(parentNode);
  }
}
