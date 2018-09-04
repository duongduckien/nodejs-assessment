var validUrl = require('valid-url');
var config = require('config');
var isemail = require('isemail');
var commonModel = require('../models/common');
var status = require('../common/statusCode');

/**
 * Validate register
 */
const register = async (req, res, next) => {

    let emailOfteacher = req.body.teacher;
    let emailOfStudents = req.body.students;

    if (!req.body.teacher) return responseError(res, 'teacher', 'required');
    if (!req.body.students) return responseError(res, 'students', 'required');
    if (Array.isArray(emailOfStudents) && emailOfStudents.length === 0) return responseError(res, 'students', 'required');
    if (!isEmail(emailOfteacher)) return responseError(res, 'teacher', 'email');
    if (!Array.isArray(emailOfStudents)) return responseError(res, 'students', 'array');
    if (!isEmail(emailOfStudents)) return responseError(res, 'students', 'email');

    let checkEmailOfTeacher = await emailExistInDB(emailOfteacher, 'teachers');
    if (!checkEmailOfTeacher) return responseError(res, 'teachers', 'exists');

    let checkEmailOfStudent = await emailExistInDB(emailOfStudents, 'students');
    if (!checkEmailOfStudent) return responseError(res, 'students', 'exists');

    next();

}

/**
 * Validate get common students
 */
const commonstudents = async (req, res, next) => {

    let emailOfteacher = req.query.teacher;

    if (!emailOfteacher) return responseError(res, 'teacher', 'required');
    if (!isEmail(emailOfteacher)) return responseError(res, 'teacher', 'email');

    let checkEmailOfTeacher = await emailExistInDB(emailOfteacher, 'teachers');
    if (!checkEmailOfTeacher) return responseError(res, 'teachers', 'exists');

    next();

}

/**
 * Validate suspend pupils
 */
const suspend = async (req, res, next) => {

    let emailOfStudents = req.body.student;

    if (!emailOfStudents) return responseError(res, 'students', 'required');
    if (!isEmail(emailOfStudents)) return responseError(res, 'students', 'email');

    let checkEmailOfStudent = await emailExistInDB(emailOfStudents, 'students');
    if (!checkEmailOfStudent) return responseError(res, 'students', 'exists');

    next();

}

/**
 * Validate retrive for notifications
 */
const retriveForNotifications = async (req, res, next) => {

    let emailOfteacher = req.body.teacher;

    if (!emailOfteacher) return responseError(res, 'teacher', 'required');
    if (!isEmail(emailOfteacher)) return responseError(res, 'teacher', 'email');

    let checkEmailOfTeacher = await emailExistInDB(emailOfteacher, 'teachers');
    if (!checkEmailOfTeacher) return responseError(res, 'teachers', 'exists');

    next();

}

/**
 * Response error
 */
const responseError = (res, fieldName, type) => {

    let message = '';

    switch (type) {
        case 'required':
            message = `The ${fieldName} field is required`;
            break;
        case 'email':
            message = `The ${fieldName} field must be email`;
            break;
        case 'array':
            message = `The ${fieldName} field must be an array`;
            break;
        case 'exists':
            message = `The ${fieldName} field must be exist`;
            break;
        default:
            break;
    }

    return res.status(status.BAD_REQUEST).json({
        status: config.get('statusResponse.error'),
        message: message
    });

}

/**
 * Check emails in array
 */
const isEmail = (emails) => {

    if (Array.isArray(emails) && emails.length > 0) {
        for (let i=0; i<emails.length; i++) {
            if (!isemail.validate(emails[i].trim())) return false;
        }
    } else {
        if (!isemail.validate(emails.trim())) return false;
    }

    return true;

}

/**
 * Check email in database
 */
const emailExistInDB = (emails, tableName) => {

    return new Promise(async (resolve, reject) => {
        if (Array.isArray(emails) && emails.length > 0) {
            for (let i=0; i<emails.length; i++) {
                let emailExists = await commonModel.exist(tableName, 'email', emails[i].trim());
                if (!emailExists) resolve(false);
            }
        } else {
            let emailExists = await commonModel.exist(tableName, 'email', emails);
            if (!emailExists) resolve(false);
        }
    
        resolve(true);
    })

}

module.exports = {
    register: register,
    commonstudents: commonstudents,
    suspend: suspend,
    retriveForNotifications: retriveForNotifications
}