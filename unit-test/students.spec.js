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

describe('Students', () => {

    before(async () => {

        let teacherData = {
            name: 'Student Test 2',
            email: 'student-test-2@gmail.com',
            status: 1,
            created_at: new Date()
        }
        
        let checkExist_2 = await commonModel.exist('students', 'email', 'student-test-2@gmail.com');

        if (!checkExist_2) {
            await commonModel.create('students', teacherData);
        }

    });

    after(async () => {

        let checkExist_1 = await commonModel.exist('students', 'email', 'student-test-1@gmail.com');
        let checkExist_2 = await commonModel.exist('students', 'email', 'student-test-2@gmail.com');

        if (checkExist_1) {
            await commonModel.remove('students', 'email', 'student-test-1@gmail.com');
        }

        if (checkExist_2) {
            await commonModel.remove('students', 'email', 'student-test-2@gmail.com');
        }

    });

    context('POST /api/students', () => {

        it('should validate name exist', (done) => {
            request(app).post('/api/students')
                .send({
                    email: 'student-test-1@gmail.com'
                })
                .expect(400)
                .end((err, res) => {
                    expect(res.body).to.have.property('error').to.equal('Validation failed');
                    expect(res.body).to.have.property('fields').to.have.property('name').to.be.an('array').that.includes('101');
                    done(err);
                });
        });

        it('should validate email exist', (done) => {
            request(app).post('/api/students')
                .send({
                    name: 'Student Test 1'
                })
                .expect(400)
                .end((err, res) => {
                    expect(res.body).to.have.property('error').to.equal('Validation failed');
                    expect(res.body).to.have.property('fields').to.have.property('email').to.be.an('array').that.includes('101');
                    done(err);
                });
        });

        it('should validate email unique', (done) => {
            request(app).post('/api/students')
                .send({
                    name: 'Student Test 2',
                    email: 'student-test-2@gmail.com'
                })
                .expect(400)
                .end((err, res) => {
                    expect(res.body).to.have.property('error').to.equal('Validation failed');
                    expect(res.body).to.have.property('fields').to.have.property('email').to.be.an('array').that.includes('114');
                    done(err);
                });
        });

        it('should create student', (done) => {
            request(app).post('/api/students')
                .send({
                    name: 'Student Test 1',
                    email: 'student-test-1@gmail.com'
                })
                .expect(201)
                .end((err, res) => {
                    expect(res.body).to.have.property('status').to.equal(config.get('statusResponse.success'));
                    done(err);
                });
        });

    });

});