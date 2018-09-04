var express = require('express');
var router = express.Router();

// Json config
var config = require('config');

// Model
var commonModel = require('../models/common');

// Status code
var status = require('../common/statusCode');

// Helper
var writeLogs = require('../helpers/writeLogs');
var middleware = require('../helpers/middleware');

/**
 * Suspend student
 */
router.post('/', middleware.suspend, async (req, res) => {

    try {

        let emailOfStudent = req.body.student;
        
        // Suspend student
        let data = {
            status: 0
        }

        await commonModel.update('students', 'email', emailOfStudent, data);

        return res.status(status.NO_CONTENT).json({
            status: config.get('statusResponse.success'),
            message: 'Suspend sucessfully!'
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
            message: 'Suspend failed!'
        });

    }

});

module.exports = router;