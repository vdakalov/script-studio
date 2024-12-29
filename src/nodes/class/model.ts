import { cid } from '../../libs/model';
import PackageModel from '../package/model';

export enum Access {
  Private,
  Protected,
  Public
}

export type MemberArgument = {
  name: string;
  type: unknown;
  initializer: unknown;
};

export type MethodArguments = {
  list: MemberArgument[];
  optional?: number; // how many arguments are optional from end of the list, none by default
};

export type Property = {
  name: string;
  type?: unknown;
  static?: boolean;
  abstract?: boolean;
  getter?: boolean;
  setter?: boolean;
  readonly?: boolean;
  access?: Access;
  initializer?: unknown;
};

export type Method = {
  name: string;
  arguments?: MethodArguments;
  type?: unknown;
  static?: boolean;
  abstract?: boolean;
  access?: Access;
  initializer?: unknown;
};

export type Constructor = {
  arguments?: MethodArguments;
  access?: Access;
  initializer?: unknown;
};

export type Model = {
  mid: string; // model id
  name: string; // class name
  constructor?: Constructor;
  properties?: Property[];
  methods?: Method[];
  abstract?: boolean;
  extends?: unknown;
  implements?: unknown[];
};


export class Controller {

}

export function create(name: string): Model {
  return { mid: cid(), name };
}

export function createProperty(): Property {

}
