import { PrivateResource } from '../private-resource';

export class ContentTypes extends PrivateResource {
  constructor({rawClient, connect}) {
    super({
      resourceType: "content_types",
      rawClient,
      connect
    });
  }
}
