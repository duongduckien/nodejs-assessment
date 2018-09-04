var db = require('../common/database');
var connectDB = db.getConnectDB();
var commonHelper = require('../helpers/common');

/**
 * Get data from emails
 */
const getTeachersByEmail = (arrEmail) => {

    return new Promise((resolve, reject) => {

        if (arrEmail) {
            let query = connectDB.query(`SELECT * FROM teacher WHERE email IN ('${arrEmail.join("','")}')`, (err, result) => {
                if (err) {
                    reject(commonHelper.errorSQL(err));
                } else {
                    resolve(result);
                }
            });
        }

    });

}

module.exports = {
    getTeachersByEmail: getTeachersByEmail
}