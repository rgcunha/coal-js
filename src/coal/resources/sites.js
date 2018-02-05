import { PrivateResource } from '../private-resource';

export class Sites extends PrivateResource {
  constructor({rawClient, connect}) {
    super({
      resourceType: "sites",
      rawClient,
      connect
    });
  }
}
