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
var middleware = require('../helpers/middleware');

/**
 * Register student for teacher
 */
router.post('/', middleware.register, async (req, res) => {

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

        if (e.type && e.type === 'SQL') {

            writeLogs.createFile(e.error, config.get('typeLogs.error'));

            return res.status(status.INTERNAL_SERVER_ERROR).json({
                status: config.get('statusResponse.error'),
                message: 'SQL Query have problems!'
            });

        } else if (e.type && e.type === 'APP') {

            writeLogs.createFile(e.error, config.get('typeLogs.error'));

            return res.status(status.BAD_REQUEST).json({
                status: config.get('statusResponse.error'),
                message: e.error
            });

        }

        return res.status(status.BAD_REQUEST).json({
            status: config.get('statusResponse.error'),
            message: 'Register failed!'
        });
    }

});

module.exports = router;