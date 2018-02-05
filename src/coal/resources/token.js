import { Resource } from '../resource';

export class Token extends Resource {
  constructor({rawClient}) {
    super({
      resourceType: "tokens",
      rawClient
    });
  }
}
