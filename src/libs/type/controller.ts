

export default abstract class TypeController<T> {
  // todo: Generic of T should extends some restrictions to avoid lost actual value
  //  it should pass anywhere as value-reference. E.g. object, array, not primitives

  public type: T;

  constructor(type: T) {
    this.type = type;
  }

  protected debugLog(...args: unknown[]): void {
    console.log(new Date().toLocaleString(), this.constructor.name, ...args);
  }
}
