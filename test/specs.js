const
  chai = require('chai');

describe('App', () => {
  it('Has an entry point', () => {
    chai.expect(require('../src/index')).to.be.an('object');
  });
});
