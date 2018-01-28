import { expect } from 'chai';
import sinon from 'sinon';
import axios from 'axios';
import { RawClient } from './raw-client';
import { Connection } from './connection';
import { tokens, myAccount } from '../../test/fixtures';

describe('RawClient', () => {
  const httpClient = axios.create();
  const rawClient = new RawClient({
    baseUrl: "http://example.com/locomotive/api",
    httpClient
  });

  let sandbox;
  let path;
  let body;
  let connection;

  beforeEach(() => sandbox = sinon.sandbox.create());

  afterEach(() => sandbox.restore());

  describe('create()', () => {
    beforeEach(() => {
      path = 'tokens.json';
      body = { email: "max.musterman@gmail.com", api_key: "12345678" };
      connection = null;
    });

    context('when is a public resource', () => {
      it('creates resource', (done) => {
        const resolved = new Promise((resolve) => resolve(tokens));
        sandbox.stub(httpClient, 'post').returns(resolved);

        rawClient.create(path, body, connection)
          .then((response) => {
            const { status, data } = response;
            expect(status).to.equal(201);
            expect(data.token).to.equal('K9zm8niKTxuM4ZMNK7Ct');
          })
          .then(done, done)
      });
    });
  });

  describe('get()', () => {
    beforeEach(() => {
      path = 'my_account.json';
      connection = new Connection({
        email: "max.musterman@gmail.com",
        token: "K9zm8niKTxuM4ZMNK7Ct"
      });
    });

    it('fetches resource', (done) => {
      const resolved = new Promise((resolve) => resolve(myAccount));
      sandbox.stub(httpClient, 'get').returns(resolved);

      rawClient.get(path, connection)
        .then((response) => {
          const { status, data } = response;
          expect(status).to.equal(200);
          expect(data.name).to.equal('Max Mustermann');
        })
        .then(done, done)
    });
  });
});
