const chai = require('chai');
const expect = chai.expect;

describe('chai test', () => {
    it('compare some value', () => {
        expect(1).to.equal(1);
    });

    it('compare object', () => {
        expect({'name': 'foo'}).to.deep.equal({'name': 'foo'});
        expect({name: 'foo'}).to.have.property('name').to.equal('foo');
    });
});