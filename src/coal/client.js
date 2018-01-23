import axios from 'axios';

export class Client {
  constructor({baseUrl, email, apiKey, httpClient = null}) {
    this.baseUrl = baseUrl;
    this.email = email;
    this.apiKey = apiKey;
    this.httpClient = httpClient ? httpClient : this.buildHttpClient(baseUrl);
  }

  buildHttpClient(baseUrl) {
    return axios.create({
      baseURL: baseUrl,
      timeout: 2000,
      headers: {'Content-Type': 'application/json'}
    });
  }

  buildUrl(resourceType, id = null) {
    let url = `${this.baseUrl}/${resourceType}.json`;
    if (id) { url +=`/${id}` }
    return url;
  }

  get(resourceType, id = null) {
    const url = this.buildUrl(resourceType, id);
    return this.httpClient.get(url);
  }

  create(resourceType, data) {
    const url = this.buildUrl(resourceType);
    return this.httpClient.post(url, data);
  }

  getContentEntries() {
    return this.get("content_entries");
  }

  createToken() {
    const { email, apiKey } = this;
    const data = { email, api_key: apiKey };
    return this.create("tokens", data);
  }
}
