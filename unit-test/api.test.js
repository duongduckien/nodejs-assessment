const chai = require('chai');
const expect = chai.expect;

const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const rewire = require('rewire');
const request = require('supertest');

var router = require('../apps/controllers/index');

describe('app', () => {
    
    context('GET /', () => {
        it('should get', (done) => {
            request(router).get('/')
                .expect(200)
                .end((err, res) => {
                    console.log(res);
                    done(err);
                });
        })
    })

});