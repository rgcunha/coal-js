export class Resource {
  constructor({resourceType, rawClient, connection = null}) {
    this._resourceType = resourceType;
    this._rawClient = rawClient;
    this._connection = connection;
    this._uri = this._buildUri();
  }

  get(id) {
    const uri = this._buildUri(id);
    return this._rawClient.get(uri, this._connection);
  }

  getAll() {
    const { _uri, _connection} = this;
    return this._rawClient.get(_uri, _connection);
  }

  create(data) {
    const { _uri, _connection } = this;
    return this._rawClient.create(_uri, data, _connection);
  }

  update(id, data) {
    const uri = this._buildUri(id);
    return this._rawClient.update(uri, data, this._connection);
  }

  delete(id) {
    const uri = this._buildUri(id);
    return this._rawClient.delete(uri, this._connection);
  }

  deleteAll() {
    const { _uri, _connection } = this;
    return this._rawClient.delete(uri, _connection);
  }

  _buildUri(id = null) {
    let path = `${this._resourceType}.json`;
    if (id) { path +=`/${id}` }
    return path;
  }
}
