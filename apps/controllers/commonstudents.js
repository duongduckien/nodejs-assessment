var express = require('express');
var router = express.Router();

// Json config
var config = require('config');

// Model
var studentModel = require('../models/students');
var studentOfTeacherModel = require('../models/studentsOfTeachers');
var teacherModel = require('../models/teachers');

// Status code
var status = require('../common/statusCode');

// Helper
var writeLogs = require('../helpers/writeLogs');
var commonHelper = require('../helpers/common');
var middleware = require('../helpers/middleware');

/**
 * Get common student
 */
router.get('/', middleware.commonstudents, async (req, res) => {

    try {

        let arrEmailOfTeacher = [];

        if (Array.isArray(req.query.teacher)) {
            arrEmailOfTeacher = req.query.teacher;
        } else {
            arrEmailOfTeacher.push(req.query.teacher);
        }

        // Get id of teachers
        let teachers = await teacherModel.getTeachersByEmail(arrEmailOfTeacher);
        let arrIdOfTeachers = commonHelper.getArrData(teachers, 'id');

        // Get students of teachers
        let students = await studentOfTeacherModel.getStudents(arrIdOfTeachers);
        let arrIdOfStudent = commonHelper.getArrData(students, 'studentid');
        let duplicateIdStudent = (arrEmailOfTeacher.length > 1) ? commonHelper.duplicateArrData(arrIdOfStudent, 'multi') : commonHelper.duplicateArrData(arrIdOfStudent, 'single');

        // Get emails of students
        let dataStudents = await studentModel.getStudentsById(duplicateIdStudent);
        let emailsOfStudents = commonHelper.getArrData(dataStudents, 'email');

        return res.status(status.OK).json({
            students: emailsOfStudents
        });

    } catch (e) {

        writeLogs.createFile(e, config.get('typeLogs.error'));

        return res.status(status.BAD_REQUEST).json({
            status: config.get('statusResponse.error'),
            message: 'Retrieve failed!'
        });
    }

});

module.exports = router;