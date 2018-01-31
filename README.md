# Coal-js

The JavaScript API Client for LocomotiveCMS V3 (WIP).

## Installation

```bash
npm install coal-js
```

## Usage

```
Client = require('./coal/client.js').Client;

const client = new Client({
  baseUrl: "https://station.locomotive.works/locomotive/api/v3",
  basicAuth: {
    username: "xxx",
    password: "xxx"
  }
  email: "max.mustermann@gmail.com",
  apiKey: "a391c1669a73394d5840780fc940c05b1e12c36f"
});

// get engine version
client.getEngineVersion().then(({data}) => console.log(data.engine))

// get user name
client.getMyAccount().then(({data}) => console.log(data.name))

// get site handle
let handle;
client.getSites().then((response) => handle = response.data[0].handle)

// scope resources by site
client.scopedBySite(handle);

// get current site name
client.getCurrentSite().then(({data}) => console.log(data.name))

// get content type slug
let slug;
client.getContentTypes().then((response) => slug = response.data[0].slug)

// get content type entries
client.getContentTypeEntries(slug).then((response) => console.log(response.data))

```

## NPM Scripts

``` bash
# install dependencies
npm install

# run tests
npm run test

# run one single test
npm run test:single ./src/coal/client.test.js

# run tests and watches for file changes
npm run dev

# run tests and launch node-inspector to debug with chrome-devtools (https://medium.com/@paul_irish/debugging-node-js-nightlies-with-chrome-devtools-7c4a1b95ae27)
npm run debug

# build dist for production (ES5)
npm run build
```

## Roadmap

* [x] POST /tokens.json
* [x] GET /version.json
* [x] GET /my_account.json
* [x] GET /sites.json
* [ ] POST /sites.json
* [ ] DELETE /sites.json/{id}
* [x] GET /current_site.json
* [ ] GET /pages.json
* [ ] GET /pages.json/{id}
* [ ] POST /pages.json
* [ ] PATCH /pages.json/{id}
* [ ] DELETE /pages.json/{id}
* [x] GET /content_types.json
* [x] GET /content_types/{id}/entries.json
* [ ] POST /content_entries.json
* [ ] PATCH /content_entries.json/{id}
* [ ] DELETE /content_entries.json/{id}
