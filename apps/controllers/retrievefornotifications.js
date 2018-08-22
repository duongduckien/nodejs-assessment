var express = require('express');
var router = express.Router();

// Json config
var config = require('config');

// Model
var commonModel = require('../models/common');
var studentModel = require('../models/students');

// Status code
var status = require('../common/statusCode');

// Helper
var writeLogs = require('../helpers/writeLogs');
var commonHelper = require('../helpers/common');

/**
 * Create notifications to students from teachers
 */
router.post('/', async (req, res) => {

    try {

        let emailOfTeacher = req.body.teacher;
        let notification = req.body.notification;

        // Get ID of teacher
        let idOfteacher = await commonModel.getId('teachers', 'email', emailOfTeacher);
        
        // Get students of teacher
        let students = await commonModel.get('students_of_teachers', 'teacherid', idOfteacher);
        let arrIdOfStudents = commonHelper.getArrData(students, 'studentid');

        // Get emails of students
        let dataStudents = await studentModel.getStudentsById(arrIdOfStudents);
        let arrEmailsOfStudents = commonHelper.getArrData(dataStudents, 'email');

        // Convert email
        let arrStr = commonHelper.splitString(notification, ' @');
        let arrEmailMention = commonHelper.getEmailInArray(arrStr);
        let recipients = commonHelper.uniqueArrData(arrEmailsOfStudents.concat(arrEmailMention));

        if (recipients.length <= 0) {
            return res.status(status.BAD_REQUEST).json({
                status: config.get('statusResponse.error'),
                message: 'Do not have email or suspend!'
            });
        }

        // Insert notification to DB
        let resultOfNotification = await commonModel.create('notifications', {
            teacherid: idOfteacher,
            content: notification,
            created_at: new Date()
        });

        let idOfNotification = resultOfNotification.insertId;

        // Update notification to students
        if (recipients.length > 0) {
            for (let i=0; i<recipients.length; i++) {

                // Check email of student is exist
                let checkStudent = await commonModel.exist('students', 'email', recipients[i]);

                if (checkStudent) {

                    // Get id of student by email
                    let idStudent = await commonModel.getId('students', 'email', recipients[i]);

                    // Update notification to student
                    await commonModel.create('notifications_of_students', {
                        studentid: idStudent,
                        notificationid: idOfNotification,
                        created_at: new Date()
                    });

                }

            }
        }

        return res.status(status.OK).json({
            recipients: recipients
        });

    } catch (e) {

        writeLogs.createFile(e, config.get('typeLogs.error'));

        return res.status(status.BAD_REQUEST).json({
            status: config.get('statusResponse.error'),
            message: 'Notification failed!'
        });
    }

});

module.exports = router;