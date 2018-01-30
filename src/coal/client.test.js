import { expect } from 'chai';
import sinon from 'sinon';
import axios from 'axios';
import { Client } from './client';
import { tokens, myAccount, sites, currentSite } from '../../test/fixtures';

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
      const resolved = new Promise((resolve) => resolve(tokens));
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

  describe('protected resources', () => {
    beforeEach(() => {
      const resolved = new Promise((resolve) => resolve(tokens));
      sandbox.stub(client, 'createToken').returns(resolved);
    })

    describe('getMyAccount()', () => {
      it('returns the user account', (done) => {
        const resolved = new Promise((resolve) => resolve(myAccount));
        sandbox.stub(httpClient, 'get').returns(resolved);

        client.getMyAccount()
          .then((response) => {
            const { status, data } = response;
            expect(status).to.equal(200);
            expect(data.email).to.equal('max.mustermann@gmail.com');
            expect(data.name).to.equal('Max Mustermann');
          })
          .then(done, done)
      });
    });

    describe('getSites()', () => {
      it('returns all sites', (done) => {
        const resolved = new Promise((resolve) => resolve(sites));
        sandbox.stub(httpClient, 'get').returns(resolved);

        client.getSites()
          .then((response) => {
            const { status, data } = response;
            expect(status).to.equal(200);
            expect(data).to.be.an("array");
            expect(data[0].name).to.equal('My Site');
            expect(data[0].handle).to.equal('thriving-leaves-5509');
          })
          .then(done, done)
      });
    });

    describe('scoped by a site handle', () => {
      beforeEach(() => client.scopedBySite('thriving-leaves-5509'));

      describe('getCurrentSite()', () => {
        it('returns the current site', (done) => {
          const resolved = new Promise((resolve) => resolve(currentSite));
          sandbox.stub(httpClient, 'get').returns(resolved);

          client.getCurrentSite()
            .then((response) => {
              const { status, data } = response;
              expect(status).to.equal(200);
              expect(data.name).to.equal('My Site');
              expect(data.handle).to.equal('thriving-leaves-5509');
            })
            .then(done, done)
        });
      });
    });
  });
});
