import { expect } from 'chai';
import sinon from 'sinon';
import axios from 'axios';
import { Resource } from './resource';
import { RawClient } from './raw-client';

describe('Resource', () => {
  const resourceType = "foo";
  const httpClient = axios.create();
  const rawClient = new RawClient({
    baseUrl: "http://example.com/locomotive/api",
    httpClient
  });
  const resource = new Resource({resourceType, rawClient});
  const resourcePromise = new Promise((resolve) => resolve());

  let sandbox;

  beforeEach(() => sandbox = sinon.sandbox.create());

  afterEach(() => sandbox.restore());

  describe('getAll()', () => {
    it('returns all resources of a given type', () => {
      rawClient.get = sandbox.stub().returns(resourcePromise);

      const response = resource.getAll();

      expect(response).to.equal(resourcePromise);
      expect(rawClient.get.calledOnce).to.be.true;
      expect(rawClient.get.calledWithExactly("foo.json", null)).to.be.true;
    });
  });

  describe('create()', () => {
    it('creates resource of a given type', () => {
      rawClient.create = sandbox.stub().returns(resourcePromise);

      const data = { foo: "bar" };
      const response = resource.create(data);

      expect(response).to.equal(resourcePromise);
      expect(rawClient.create.calledOnce).to.be.true;
      expect(rawClient.create.calledWithExactly("foo.json", data, null)).to.be.true;
    });
  });
});
