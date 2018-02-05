import { expect } from 'chai';
import sinon from 'sinon';
import axios from 'axios';
import { Client } from './client';
import { tokens, version, myAccount, sites, currentSite, contentTypes, contentTypeEntries } from '../../test/fixtures';

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

  describe('_createToken()', () => {
    it('returns new token', (done) => {
      const resolved = new Promise((resolve) => resolve(tokens));
      sandbox.stub(httpClient, 'post').returns(resolved);

      client._createToken()
        .then((response) => {
          const { status, data } = response;
          expect(status).to.equal(201);
          expect(data.token).to.equal('K9zm8niKTxuM4ZMNK7Ct');
        })
        .then(done, done)
    });
  });

  describe('private resources', () => {
    beforeEach(() => {
      const resolved = new Promise((resolve) => resolve(tokens));
      sandbox.stub(client, '_createToken').returns(resolved);
    })

    describe('version().getAll()', () => {
      it('returns the version of the engine', (done) => {
        const resolved = new Promise((resolve) => resolve(version));
        sandbox.stub(httpClient, 'get').returns(resolved);

        client.version().getAll()
          .then((response) => {
            const { status, data } = response;
            expect(status).to.equal(200);
            expect(data.engine).to.equal('3.3.0');
          })
          .then(done, done)
      });
    });

    describe('myAccount().getAll()', () => {
      it('returns the user account', (done) => {
        const resolved = new Promise((resolve) => resolve(myAccount));
        sandbox.stub(httpClient, 'get').returns(resolved);

        client.myAccount().getAll()
          .then((response) => {
            const { status, data } = response;
            expect(status).to.equal(200);
            expect(data.email).to.equal('max.mustermann@gmail.com');
            expect(data.name).to.equal('Max Mustermann');
          })
          .then(done, done)
      });
    });

    describe('sites().getAll()', () => {
      it('returns all sites', (done) => {
        const resolved = new Promise((resolve) => resolve(sites));
        sandbox.stub(httpClient, 'get').returns(resolved);

        client.sites().getAll()
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

      describe('currentSite().getAll()', () => {
        it('returns the current site', (done) => {
          const resolved = new Promise((resolve) => resolve(currentSite));
          sandbox.stub(httpClient, 'get').returns(resolved);

          client.currentSite().getAll()
            .then((response) => {
              const { status, data } = response;
              expect(status).to.equal(200);
              expect(data.name).to.equal('My Site');
              expect(data.handle).to.equal('thriving-leaves-5509');
            })
            .then(done, done)
        });
      });

      describe('contentTypes().getAll()', () => {
        it('returns all the content types', (done) => {
          const resolved = new Promise((resolve) => resolve(contentTypes));
          sandbox.stub(httpClient, 'get').returns(resolved);

          client.contentTypes().getAll()
            .then((response) => {
              const { status, data } = response;
              expect(status).to.equal(200);
              expect(data).to.be.an("array");
              expect(data[0].name).to.equal('Press articles');
              expect(data[0].slug).to.equal('press_articles');
            })
            .then(done, done)
        });
      });

      describe('contentEntries().getAll()', () => {
        it('returns all the entries for a content type', (done) => {
          const resolved = new Promise((resolve) => resolve(contentTypeEntries));
          sandbox.stub(httpClient, 'get').returns(resolved);

          client.contentEntries('press_articles').getAll()
            .then((response) => {
              const { status, data } = response;
              expect(status).to.equal(200);
              expect(data).to.be.an("array");
              expect(data[2].content_type_slug).to.equal('press_articles');
              expect(data[2]._label).to.equal('Financial Times');
            })
            .then(done, done)
        });
      });
    });
  });
});
