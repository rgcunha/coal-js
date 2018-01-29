import axios from 'axios';

export class RawClient {
  constructor({baseUrl, httpClient}) {
    this._baseUrl = baseUrl;
    this._httpClient = httpClient;
  }

  get(path, connection) {
    return this._sendRequest({method: "get", path, connection});
  }

  create(path, body, connection) {
    return this._sendRequest({method: "post", path, body, connection});
  }

  _buildUrl(path) {
    return `${this._baseUrl}/${path}`;
  }

  _sendRequest({method, path, queryParams = null, body = null, connection = null}) {
    const url = this._buildUrl(path);
    const headers = this._httpClient.defaults.headers;
    if (connection) {
      const { email, token, handle } = connection;
      headers.common['X-Locomotive-Account-Email'] = email;
      headers.common['X-Locomotive-Account-Token'] = token;
      headers.common['X-Locomotive-Site-Handle']   = handle;
    }
    return this._httpClient[method](url, body);
  }
}
