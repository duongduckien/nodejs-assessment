var express = require('express');
var router = express.Router();

// Json config
var config = require('config');

// Model
var commonModel = require('../models/common');
var studentModel = require('../models/students');
var studentOfTeacherModel = require('../models/studentsOfTeachers');

// Status code
var status = require('../common/statusCode');

// Helper
var writeLogs = require('../helpers/writeLogs');
var commonHelper = require('../helpers/common');

/**
 * Register student for teacher
 */
router.post('/', async (req, res) => {

    try {

        let emailOfTeacher = req.body.teacher;

        let idOfTeacher = await commonModel.getId('teachers', 'email', emailOfTeacher);
        let students = await studentModel.getStudentsByEmail(req.body.students);

        let arrIdOfStudent = commonHelper.getArrData(students, 'id');

        if (arrIdOfStudent.length > 0) {

            for(let i=0; i<arrIdOfStudent.length; i++) {
                
                let checkExist = await studentOfTeacherModel.isExistStudent(idOfTeacher, arrIdOfStudent[i]);

                if (!checkExist) {
                    await studentOfTeacherModel.storeStudentsOfTeacher({
                        teacherid: idOfTeacher,
                        studentid: arrIdOfStudent[i]
                    });
                }

            }

        }

        return res.status(status.NO_CONTENT).json({
            status: config.get('statusResponse.success'),
            message: 'Register sucessfully!'
        });

    } catch (e) {

        writeLogs.createFile(e, config.get('typeLogs.error'));

        return res.status(status.BAD_REQUEST).json({
            status: config.get('statusResponse.error'),
            message: 'Register failed!'
        });
    }

});

module.exports = router;