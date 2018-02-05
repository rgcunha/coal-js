import { PrivateResource } from '../private-resource';
import { ArgumentError } from '../errors';

export class ContentEntries extends PrivateResource {
  constructor({rawClient, connect, contentType}) {
    if (!contentType) { throw new ArgumentError("contentType must be a string") }
    super({
      resourceType: `content_types/${contentType}/entries`,
      rawClient,
      connect
    });
  }
}
