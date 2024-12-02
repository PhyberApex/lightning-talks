interface Obj {
  methodShorthand(param: string): void;
  objectProperty: (param: string) => void;
}

function functionDeclaration(param: string) {}
const arrowFunction = (param: string) => {};

const examples: Obj[] = [
  {
    methodShorthand: arrowFunction,
    objectProperty: functionDeclaration,
  },
  {
    methodShorthand: functionDeclaration,
    objectProperty: arrowFunction,
  },
];
