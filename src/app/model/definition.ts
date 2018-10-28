interface DefinitionInterface {
  definition: string;
  }
export class Definition implements DefinitionInterface {
  definition: string;

  constructor(definition: string) {
    this.definition = definition;
  }
}
