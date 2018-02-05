import { PrivateResource } from '../private-resource';

export class MyAccount extends PrivateResource {
  constructor({rawClient, connect}) {
    super({
      resourceType: "my_account",
      rawClient,
      connect
    });
  }
}
