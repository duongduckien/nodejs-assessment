var db = require('../common/database');
var connectDB = db.getConnectDB();

/**
 * Get data from emails
 */
const getTeachersByEmail = (arrEmail) => {

    return new Promise((resolve, reject) => {

        if (arrEmail) {
            let query = connectDB.query(`SELECT * FROM teachers WHERE email IN ('${arrEmail.join("','")}')`, function (err, result) {
                if (err) {
                    reject(err);
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