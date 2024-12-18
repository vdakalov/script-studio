
export namespace Reference {

  export type Project = {
    id: string;
  };

  export type Package = {
    project?: Project;
    id: string;
  };

  export type Module = {
    package?: Package;
    id: string; // module id
  };

  /**
   * variable, class, type, etc.
   * anything includes in module
   */
  export type Definition = {
    module?: Module;
    id: string;
    generics?: Definition.GenericType[]; // generics initializers
  };

  export type Type = Definition;
  export type Interface = Definition;
  export type Class = Definition;
}

export namespace Project {

  export type Packages = Record<string, Package.Type>;

  export type Type = {
    id: string;
    title: string;
    description: string;
    packages: Packages;
  };

  export type Map = Record<string, Project.Type>;
}

export namespace Package {

  // package.json fields
  export type Data = {
    name: string;
    version: string;
    description?: string;
    main?: Reference.Module;
  };

  export type Type = {
    id: string;
    title: string;
    description?: string;
    data: Data;
    modules: Reference.Module[];
  };
}

export namespace Module {

  export type Type = {
    id: string; // unique module id
    name: string[]; // ['http2', 'server']
    type: string; // 'ts', 'tsx, 'js', 'jsx', 'mjs', 'json'
    definitions: Definition.Map;
    exports?: {
      definitions?: Reference.Definition[];
      default?: Reference.Definition;
    };
    path?: string; // package relative path
  };
}

export namespace Definition {

  /**
   * Expression code to initialize subject value
   */
  export type Initializer = string;

  /**
   * Any literal (string or number)
   * @example
   * "ABC"
   * 12
   */
  export type Literal = string;

  /**
   * Any primitive type
   */
  export type Primitive = string;

  /**
   * Any complex types Array, RegExp, Date, etc.
   */
  export type Complex = {
    name: string;
    prototype: string;
  };

  export type GenericType = {
    name: string;
    extends?: Reference.Definition;
    initializer?: Reference.Definition;
  };

  export type EnumPair = {
    name: string;
    description?: string;
    value: Literal;
  };

  export type Enum = {
    name: string;
    description: string;
    pairs: EnumPair[];
  };

  export type Variable = {
    name: string;
    type: Reference.Definition;
    const?: boolean; // false by default
    initializer?: Initializer;
    generics?: GenericType[];
  };

  export namespace Function {

    export type Argument = {
      name: string;
      type: Reference.Definition;
      initializer?: Initializer;
    };

    export type Arguments = {
      list: Argument[];
      required?: number; // how many args is required, all by default
    };

    export type Type = {
      name: string;
      type: Reference.Definition;
      context?: Reference.Definition;
      async?: boolean;
      arguments: Arguments;
      generics?: GenericType[];
    };
  }

  export namespace Interface {

    export type IndexSignature = {
      key: {
        name: string;
        type: Reference.Definition;
      };
      type: Reference.Definition;
    };

    export type Property = {
      name: string;
      description: string;
      type: Reference.Definition;
      optional?: boolean;
      readonly?: boolean;
    };

    export type Properties = Property | IndexSignature;

    export type Type = {
      name: string;
      description: string;
      properties: Properties;
      extends?: Reference.Interface[];
      generics?: GenericType[];
    };
  }

  export namespace Class {

    export enum Access {
      Private,
      Protected,
      Public
    }

    export type Constructor = {
      arguments: Function.Arguments;
    };

    export type Property = {
      name: string;
      description: string;
      type: Reference.Definition;
      access?: Access;
      readonly?: boolean;
      initializer?: Initializer;
      static?: boolean;
      abstract?: boolean;
      getter?: boolean;
      setter?: boolean;
    };

    export type Method = {};

    export type Member = Property | Method | Constructor; // todo static constructor?

    export type Type = {
      name: string;
      abstract?: boolean;
      extends?: Reference.Class;
      implements?: Reference.Interface;
      members: Member[];
      generics?: GenericType[];
    };
  }

  // typescript `type` renamed to `alias` to avoid reuse keywords
  export namespace Alias {

    export type Type = {
      name: string;
      value: Reference.Type;
    };
  }

  export type Type = Literal
    | Primitive
    | Complex
    | Enum
    | Function
    | Interface.Type
    | Class.Type
    | Alias.Type;

  export type Map = Record<string, Type>;
}

export type Definitions = Definition.Type[];
