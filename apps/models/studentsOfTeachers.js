var db = require('../common/database');
var connectDB = db.getConnectDB();
var commonHelper = require('../helpers/common');

/**
 * Insert sutdents of teacher
 */
const storeStudentsOfTeacher = (data) => {

    return new Promise((resolve, reject) => {

        if (data) {
            let query = connectDB.query(`INSERT INTO students_of_teachers SET ?`, data, (err, result) => {
                if (err) {
                    reject(commonHelper.errorSQL(err));
                } else {
                    resolve(result);
                }
            });
        }

    });

}

/**
 * Check exist student for teacher
 */
const isExistStudent = (teacherid, studentid) => {

    return new Promise((resolve, reject) => {

        if (teacherid && studentid) {
            let query = connectDB.query(`SELECT * FROM students_of_teachers WHERE teacherid = ? AND studentid = ?`, [teacherid, studentid], (err, result) => {
                if (err) {
                    reject(commonHelper.errorSQL(err));
                } else {
                    if (result.length == 0) {
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                }
            });
        }

    });

}

/**
 * Get list students of teachers
 */
const getStudents = (arrTeacherid) => {

    return new Promise((resolve, reject) => {

        if (arrTeacherid) {
            let query = connectDB.query(`SELECT * FROM students_of_teachers WHERE teacherid IN ('${arrTeacherid.join("','")}')`, (err, result) => {
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
    storeStudentsOfTeacher: storeStudentsOfTeacher,
    isExistStudent: isExistStudent,
    getStudents: getStudents
}