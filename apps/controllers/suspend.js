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

/**
 * Suspend student
 */
router.post('/', async (req, res) => {

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

        writeLogs.createFile(e, config.get('typeLogs.error'));

        return res.status(status.BAD_REQUEST).json({
            status: config.get('statusResponse.error'),
            message: 'Suspend failed!'
        });

    }

});

module.exports = router;