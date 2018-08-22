var validUrl = require('valid-url');
var config = require('config');
var isemail = require('isemail');
var commonModel = require('../models/common');

/**
 * Validate create a new teacher
 */
const validateCreateTeacher = async (body) => {

    let errors = {
        "error": "Validation failed",
        "fields": {
            "name": [],
            "email": []
        }
    };

    // Check required
    if (body.name === undefined || body.name.trim() === '') {
        errors.fields.name.push(config.get('errorCode.required'));
    }

    if (body.email === undefined || body.email.trim() === '') {
        errors.fields.email.push(config.get('errorCode.required'));
    }

    // Check exist
    if (body.email !== undefined) {

        let emailCheckExist = await commonModel.exist('teachers', 'email', body.email);

        if (emailCheckExist) {
            errors.fields.email.push(config.get('errorCode.unique'));
        }

    }

    if (errors.fields.name.length > 0 || errors.fields.email.length > 0) {

        for (let key in errors.fields) {
            if (errors.fields[key].length == 0) {
                delete errors.fields[key];
            }
        }

        return errors;

    }

    return false;

}

/**
 * Validate create a new student
 */
const validateCreateStudent = async (body) => {

    let errors = {
        "error": "Validation failed",
        "fields": {
            "name": [],
            "email": []
        }
    };

    // Check required
    if (body.name === undefined || body.name.trim() === '') {
        errors.fields.name.push(config.get('errorCode.required'));
    }

    if (body.email === undefined || body.email.trim() === '') {
        errors.fields.email.push(config.get('errorCode.required'));
    }

    // Check exist
    if (body.email !== undefined) {

        let emailCheckExist = await commonModel.exist('students', 'email', body.email);

        if (emailCheckExist) {
            errors.fields.email.push(config.get('errorCode.unique'));
        }

    }

    if (errors.fields.name.length > 0 || errors.fields.email.length > 0) {

        for (let key in errors.fields) {
            if (errors.fields[key].length == 0) {
                delete errors.fields[key];
            }
        }

        return errors;

    }

    return false;

}

module.exports = {
    validateCreateTeacher: validateCreateTeacher,
    validateCreateStudent: validateCreateStudent
}