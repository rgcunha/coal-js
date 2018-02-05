import { PrivateResource } from '../private-resource';

export class CurrentSite extends PrivateResource {
  constructor({rawClient, connect}) {
    super({
      resourceType: "current_site",
      rawClient,
      connect
    });
  }
}
