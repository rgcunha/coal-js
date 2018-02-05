import axios from 'axios';
import { Token, Version, MyAccount, Sites, CurrentSite, ContentTypes, ContentEntries } from './resources';
import { RawClient } from './raw-client';
import { Connection } from './connection';

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

  token() {
    return this._token = new Token({rawClient: this._rawClient});
  }

  version() {
    return this._version = new Version({rawClient: this._rawClient, connect: this._getConnection})
  }

  myAccount() {
    return this._myAccount = new MyAccount({rawClient: this._rawClient, connect: this._getConnection})
  }

  sites() {
    return this._sites = new Sites({rawClient: this._rawClient, connect: this._getConnection})
  }

  currentSite() {
    return this._currentSite = new CurrentSite({rawClient: this._rawClient, connect: this._getConnection})
  }

  contentTypes() {
    return this._contentTypes = new ContentTypes({rawClient: this._rawClient, connect: this._getConnection})
  }

  contentEntries(contentType) {
    return this._contentEntries = new ContentEntries({
      rawClient: this._rawClient,
      connect: this._getConnection,
      contentType
    })
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

  _getConnection = () => {
    if (this._connection) {
      return new Promise((resolve) => resolve(this._connection));
    }
    return this._createConnection();
  }

  _createConnection = () => {
    return this._createToken()
      .then(({data}) => this._connection = new Connection({
        email: this._email,
        token: data.token,
        handle: this._siteHandle
      }));
  }

  _createToken = () => {
    const { _email, _apiKey } = this;
    const data = { email: _email, api_key: _apiKey };
    return this.token().create(data);
  }
}
