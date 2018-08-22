var express = require('express');
var router = express.Router();

router.use('/api/teachers', require(__dirname + '/teachers'));
router.use('/api/students', require(__dirname + '/students'));
router.use('/api/register', require(__dirname + '/register'));
router.use('/api/commonstudents', require(__dirname + '/commonstudents'));
router.use('/api/suspend', require(__dirname + '/suspend'));
router.use('/api/retrievefornotifications', require(__dirname + '/retrievefornotifications'));

router.get('/', (req, res) => {
    res.json({
        "message": "This is API"
    });
});

module.exports = router;