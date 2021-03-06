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
var validator = require('../helpers/validator');

/**
 * Create a new teacher
 */
router.post('/', async (req, res) => {

    try {

        let errors = false;
        errors = await validator.validateCreateTeacher(req.body);

        if (errors) {
          return res.status(status.BAD_REQUEST).json(errors);
        }

        let teacherData = {
            name: req.body.name,
            email: req.body.email,
            status: 1,
            created_at: new Date()
        }

        let result = await commonModel.create('teachers', teacherData);

        if (result) {
            return res.status(status.CREATED).json({
                status: config.get('statusResponse.success'),
                message: 'Create successfully!'
            });
        }

        return res.status(status.BAD_REQUEST).json({
            status: config.get('statusResponse.error'),
            message: 'Create failed!'
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
            message: 'Create failed!'
        });
    }

});

module.exports = router;