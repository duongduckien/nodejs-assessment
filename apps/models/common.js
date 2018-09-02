var db = require('../common/database');
var connectDB = db.getConnectDB();

/**
 * Check field is exist
 */
const exist = (tableName, fieldName, value) => {

    return new Promise((resolve, reject) => {

        if (tableName && fieldName) {
            let query = connectDB.query(`SELECT * FROM ${tableName} WHERE ${fieldName} = ?`, value, function (err, result) {
                if (err) {
                    reject(err);
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
 * Add new data
 */
const create = (tableName, data) => {

    return new Promise((resolve, reject) => {

        if (tableName && data) {
            let query = connectDB.query(`INSERT INTO ${tableName} SET ?`, data, function (err, result) {
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
 * Get id by value
 */
const getId = (tableName, fieldName, value) => {

    return new Promise((resolve, reject) => {

        if (tableName && fieldName && value) {
            let query = connectDB.query(`SELECT id FROM ${tableName} WHERE ${fieldName} = ?`, value, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result[0].id);
                }
            });
        }

    });

}

/**
 * Get data where value
 */
const get = (tableName, fieldName, value) => {

    return new Promise((resolve, reject) => {

        if (tableName && fieldName && value) {
            let query = connectDB.query(`SELECT * FROM ${tableName} WHERE ${fieldName} = ?`, value, function (err, result) {
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
 * Update data where value
 */
const update = (tableName, fieldName, value, data) => {

    return new Promise((resolve, reject) => {

        if (tableName && fieldName && value && data) {
            let query = connectDB.query(`UPDATE ${tableName} SET ? WHERE ${fieldName} = ?`, [data, value], function (err, result) {
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
 * Delete records where value
 */
const remove = (tableName, fieldName, value) => {

    return new Promise((resolve, reject) => {

        if (tableName && fieldName && value) {
            let query = connectDB.query(`DELETE FROM ${tableName} WHERE ${fieldName} = ?`, [value], function (err, result) {
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
    exist: exist,
    create: create,
    getId: getId,
    update: update,
    get: get,
    remove: remove
}