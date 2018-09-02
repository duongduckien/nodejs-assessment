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

describe('User Stories', () => {

    before(async () => {

        let teacherData_1 = {
            name: 'Teacher test 1',
            email: 'teacher-test-1@gmail.com',
            status: 1,
            created_at: new Date()
        }

        let teacherData_2 = {
            name: 'Teacher test 2',
            email: 'teacher-test-2@gmail.com',
            status: 1,
            created_at: new Date()
        }

        let studentData_1 = {
            name: 'Student test 1',
            email: 'student-test-1@gmail.com',
            status: 1,
            created_at: new Date()
        }

        let studentData_2 = {
            name: 'Student test 2',
            email: 'student-test-2@gmail.com',
            status: 1,
            created_at: new Date()
        }

        let studentData_3 = {
            name: 'Student test 3',
            email: 'student-test-3@gmail.com',
            status: 1,
            created_at: new Date()
        }

        let checkExistTeacherTest_1 = await commonModel.exist('teachers', 'email', 'teacher-test-1@gmail.com');
        let checkExistTeacherTest_2 = await commonModel.exist('teachers', 'email', 'teacher-test-2@gmail.com');
        let checkExistStudentTest_1 = await commonModel.exist('students', 'email', 'student-test-1@gmail.com');
        let checkExistStudentTest_2 = await commonModel.exist('students', 'email', 'student-test-2@gmail.com');
        let checkExistStudentTest_3 = await commonModel.exist('students', 'email', 'student-test-3@gmail.com');

        if (!checkExistTeacherTest_1) {
            await commonModel.create('teachers', teacherData_1);
        }

        if (!checkExistTeacherTest_2) {
            await commonModel.create('teachers', teacherData_2);
        }

        if (!checkExistStudentTest_1) {
            await commonModel.create('students', studentData_1);
        }

        if (!checkExistStudentTest_2) {
            await commonModel.create('students', studentData_2);
        }

        if (!checkExistStudentTest_3) {
            await commonModel.create('students', studentData_3);
        }

    });

    after(async () => {

        await commonModel.removeLastRows('teachers', 2);
        await commonModel.removeLastRows('students', 3);
        await commonModel.removeLastRows('students_of_teachers', 3);

    });

    context('POST /api/register', () => {

        it('should register students for teacher 1', (done) => {
            request(app).post('/api/register')
                .send({
                    "teacher": "teacher-test-1@gmail.com",
                    "students":
                        [
                            "student-test-1@gmail.com",
                            "student-test-2@gmail.com"
                        ]
                })
                .expect(204)
                .end((err, res) => {
                    done(err);
                });
        });

        it('should register students for teacher 2', (done) => {
            request(app).post('/api/register')
                .send({
                    "teacher": "teacher-test-2@gmail.com",
                    "students":
                        [
                            "student-test-1@gmail.com",
                            "student-test-3@gmail.com"
                        ]
                })
                .expect(204)
                .end((err, res) => {
                    done(err);
                });
        });

    });

    context('GET /api/commonstudents', () => {

        it('should get students of teacher', (done) => {
            request(app).get('/api/commonstudents?teacher=teacher-test-1%40gmail.com')
                .expect(200)
                .end((err, res) => {
                    expect(res.body).to.have.property('students').to.be.an('array');
                    done(err);
                });
        });

        it('should get students of teachers', (done) => {
            request(app).get('/api/commonstudents?teacher=teacher-test-1%40gmail.com&teacher=teacher-test-2%40gmail.com')
                .expect(200)
                .end((err, res) => {
                    expect(res.body).to.have.property('students').to.be.an('array');
                    done(err);
                });
        });

    });

    context('POST /api/suspend', () => {

        it('should suspend student', (done) => {
            request(app).post('/api/suspend')
                .send({
                    "student": "student-test-3@gmail.com"
                })
                .expect(204)
                .end((err, res) => {
                    done(err);
                });
        });

    });

    context('POST /api/retrievefornotifications', () => {

        it('should get list of students who can receive a given notification & have mention', (done) => {
            request(app).post('/api/retrievefornotifications')
                .send({
                    "teacher": "teacher-test-1@gmail.com",
                    "notification": "Hello students! @studentagnes@example.com @studentmiche@example.com"
                })
                .expect(200)
                .end((err, res) => {
                    expect(res.body).to.have.property('recipients').to.be.an('array').that.includes('studentagnes@example.com');
                    expect(res.body).to.have.property('recipients').to.be.an('array').that.includes('studentmiche@example.com');
                    done(err);
                });
        });

        it('should get list of students who can receive a given notification & no mention', (done) => {
            request(app).post('/api/retrievefornotifications')
                .send({
                    "teacher": "teacher-test-1@gmail.com",
                    "notification": "Hey everybody"
                })
                .expect(200)
                .end((err, res) => {
                    expect(res.body).to.have.property('recipients').to.be.an('array');
                    done(err);
                });
        });

    });

});