
type EE<EM extends Record<string, unknown[]>> = {
  [K in keyof EM]?: ((...args: EM[K]) => void)[];
};

export default abstract class TypeController<T, EM extends Record<string, unknown[]> = {}> {
  // todo: Generic of T should extends some restrictions to avoid lost actual value
  //  it should pass anywhere as value-reference. E.g. object, array, not primitives

  public type: T;

  private readonly ee: EE<EM> = {};

  constructor(type: T) {
    this.type = type;
    this.debugLog('constructor', type);
  }

  protected debugLog(methodName: string, ...args: unknown[]): void {
    console.log(new Date().toLocaleString(), this.constructor.name, methodName, ...args);
  }

  protected emit<E extends keyof EM>(name: E, ...args: EM[E]): this {
    const handlers = this.ee[name];
    if (handlers !== undefined) {
      for (const handler of handlers) {
        handler(...args);
      }
    }
    return this;
  }

  protected emitAsync<E extends keyof EM>(name: E, ...args: EM[E]): this {
    window.setTimeout(() => this.emit(name, ...args));
    return this;
  }

  public on<E extends keyof EM>(name: E, handler: (...args: EM[E]) => void): this {
    const handlers = this.ee[name] || (this.ee[name] = []);
    if (handlers.indexOf(handler) === -1) {
      handlers.push(handler);
    }
    return this;
  }

  public off<E extends keyof EM>(name: E, handler?: (...args: EM[E]) => void): this {
    const handlers = this.ee[name];
    if (handlers !== undefined) {
      if (handler === undefined) {
        handlers.length = 0;
        return this;
      }
      let index = -1;
      while ((index = handlers.indexOf(handler)) !== -1) {
        handlers.splice(index, 1);
      }
    }
    return this;
  }
}
