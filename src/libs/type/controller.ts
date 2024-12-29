
export default abstract class TypeController<T> {

  public type: T;

  constructor(type: T) {
    this.type = type;
  }
}
