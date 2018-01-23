import { expect } from 'chai';
import sinon from 'sinon';
import axios from 'axios';
import { Client } from './client';
import tokensResponse from '../../test/fixtures/tokens';

describe('Client', () => {
  const httpClient = axios.create();
  const client = new Client({
    baseUrl: "http://example.com/locomotive/api",
    email: "max.musterman@gmail.com",
    apiKey: "key",
    httpClient
  });

  let sandbox;

  beforeEach(() => sandbox = sinon.sandbox.create());

  afterEach(() => sandbox.restore());

  describe('createToken()', () => {
    it('returns new token', (done) => {
      const resolved = new Promise((resolve) => resolve(tokensResponse));
      sandbox.stub(httpClient, 'post').returns(resolved);

      client.createToken()
        .then((response) => {
          const { status, data } = response;
          expect(status).to.equal(201);
          expect(data.token).to.equal('K9zm8niKTxuM4ZMNK7Ct');
        })
        .then(done, done)
    });
  });
});
