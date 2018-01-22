import { expect } from 'chai';
import { helloWorld } from './client';

describe('helloWorld()', () => {
  it('returns HelloWorld', () => {
    expect(helloWorld()).to.equal("Hello World!");
  });
});
