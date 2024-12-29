
export type TypeId = string;

export function createTypeId(): TypeId {
  return Math.random().toString(36);
}
