var db = require('../common/database');
var connectDB = db.getConnectDB();

/**
 * Get students from emails
 */
const getStudentsByEmail = (arrEmail) => {

    return new Promise((resolve, reject) => {

        if (arrEmail) {
            let query = connectDB.query(`SELECT * FROM students WHERE email IN ('${arrEmail.join("','")}') AND status = 1`, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        }

    });

}

/**
 * Get students from id
 */
const getStudentsById = (arrId) => {

    return new Promise((resolve, reject) => {

        if (arrId) {
            let query = connectDB.query(`SELECT * FROM students WHERE id IN ('${arrId.join("','")}') AND status = 1`, function (err, result) {
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
    getStudentsByEmail: getStudentsByEmail,
    getStudentsById: getStudentsById
}