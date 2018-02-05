import { PrivateResource } from '../private-resource';

export class Version extends PrivateResource {
  constructor({rawClient, connect}) {
    super({
      resourceType: "version",
      rawClient,
      connect
    });
  }
}
