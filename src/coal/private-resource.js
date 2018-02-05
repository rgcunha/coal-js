import { Resource } from './resource';

export class PrivateResource extends Resource {
  constructor({resourceType, rawClient, connect}) {
    super({
      resourceType,
      rawClient
    })
    this._connect = connect;
  }

  get(id) {
    return this._connect().then((connection) => {
      this._connection = connection;
      return super.get(id);
    })
  }

  getAll() {
    return this._connect().then((connection) => {
      this._connection = connection;
      return super.getAll();
    })
  }

  create(data) {
    return this._connect().then((connection) => {
      this._connection = connection;
      return super.create(data);
    })
  }

  update(id, data) {
    return this._connect().then((connection) => {
      this._connection = connection;
      return super.update(id, data);
    })
  }

  delete(id) {
    return this._connect().then((connection) => {
      this._connection = connection;
      return super.delete(id);
    })
  }

  deleteAll() {
    return this._connect().then((connection) => {
      this._connection = connection;
      return super.deleteAll();
    })
  }
}
