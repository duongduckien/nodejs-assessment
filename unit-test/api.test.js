const chai = require('chai');
const expect = chai.expect;

const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const rewire = require('rewire');
const request = require('supertest');
const config = require('config');

const app = rewire('../index');
const commonModel = require('../apps/models/common');

describe('API', () => {

    before(() => {

    });

    after(() => {

    });

    beforeEach(() => {

    });

    afterEach(() => {

    });

    context('GET /', () => {
        it('API working', (done) => {
            request(app).get('/')
                .expect(200)
                .end((err, res) => {
                    expect(res.body).to.have.property('message').to.equal('This is API');
                    done(err);
                });
        });
    });

});