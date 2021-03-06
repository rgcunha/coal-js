import axios from 'axios';
import { RawClient } from './raw-client';
import { Connection } from './connection';
import { ArgumentError } from './errors';

export class Client {
  constructor({baseUrl, basicAuth = null, email, apiKey, httpClient = null}) {
    this._baseUrl = baseUrl;
    this._email = email;
    this._apiKey = apiKey;
    this._httpClient = httpClient ? httpClient : this._buildHttpClient({baseUrl, basicAuth});
    this._rawClient = new RawClient({
      baseUrl,
      httpClient: this._httpClient
    });
    this._connection = null;
    this._siteHandle = null;
  }

  scopedBySite(siteHandle) {
    this._siteHandle = siteHandle;
    if (this._connection) {
      this._connection.handle = siteHandle;
    }
    return this;
  }

  createToken() {
    const { _email, _apiKey } = this;
    const data = { email: _email, api_key: _apiKey };
    return this._create("tokens", data)
  }

  getEngineVersion() {
    return this._getConnection()
      .then((connection) => this._get("version", connection));
  }

  getMyAccount() {
    return this._getConnection()
      .then((connection) => this._get("my_account", connection));
  }

  getSites() {
    return this._getConnection()
      .then((connection) => this._get("sites", connection));
  }

  getCurrentSite() {
    return this._getConnection()
      .then((connection) => this._get("current_site", connection));
  }

  getContentTypes() {
    return this._getConnection()
      .then((connection) => this._get("content_types", connection));
  }

  getContentTypeEntries(contentType) {
    if (!contentType) { throw new ArgumentError("content type must be a string"); }
    const resourceType = `content_types/${contentType}/entries`;
    return this._getConnection()
      .then((connection) => this._get(resourceType, connection));
  }

  _buildHttpClient({baseUrl, basicAuth = null}) {
    const config = {
      baseURL: baseUrl,
      timeout: 2000,
      auth: basicAuth,
      headers: {'Content-Type': 'application/json'}
    }
    return axios.create(config);
  }

  _get(resourceType, connection = null) {
    const path = this._buildPath(resourceType);
    return this._rawClient.get(path, connection);
  }

  _create(resourceType, data, connection = null) {
    const path = this._buildPath(resourceType);
    return this._rawClient.create(path, data, connection);
  }

  _buildPath(resourceType, id = null) {
    let path = `${resourceType}.json`;
    if (id) { path +=`/${id}` }
    return path;
  }

  _getConnection() {
    if (this._connection) {
      return new Promise((resolve) => resolve(this._connection));
    }
    return this._createConnection();
  }

  _createConnection() {
    return this.createToken()
      .then(({data}) => this._connection = new Connection({
        email: this._email,
        token: data.token,
        handle: this._siteHandle
      }));
  }
}
