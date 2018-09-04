var db = require('../common/database');
var connectDB = db.getConnectDB();
var commonHelper = require('../helpers/common');

/**
 * Check field is exist
 */
const exist = (tableName, fieldName, value) => {

    return new Promise((resolve, reject) => {

        if (tableName && fieldName) {
            let query = connectDB.query(`SELECT * FROM ${tableName} WHERE ${fieldName} = ?`, value, (err, result) => {
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
 * Add new data
 */
const create = (tableName, data) => {

    return new Promise((resolve, reject) => {

        if (tableName && data) {
            let query = connectDB.query(`INSERT INTO ${tableName} SET ?`, data, (err, result) => {
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
 * Get id by value
 */
const getId = (tableName, fieldName, value) => {

    return new Promise((resolve, reject) => {

        if (tableName && fieldName && value) {
            let query = connectDB.query(`SELECT id FROM ${tableName} WHERE ${fieldName} = ?`, value, (err, result) => {
                if (err) {
                    reject(commonHelper.errorSQL(err));
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
            let query = connectDB.query(`SELECT * FROM ${tableName} WHERE ${fieldName} = ?`, value, (err, result) => {
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
 * Update data where value
 */
const update = (tableName, fieldName, value, data) => {

    return new Promise((resolve, reject) => {

        if (tableName && fieldName && value && data) {
            let query = connectDB.query(`UPDATE ${tableName} SET ? WHERE ${fieldName} = ?`, [data, value], (err, result) => {
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
 * Delete records where value
 */
const remove = (tableName, fieldName, value) => {

    return new Promise((resolve, reject) => {

        if (tableName && fieldName && value) {
            let query = connectDB.query(`DELETE FROM ${tableName} WHERE ${fieldName} = ?`, [value], (err, result) => {
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
 * Delete lastest record by id
 */
const removeLastRows = (tableName, limitNumber) => {

    return new Promise((resolve, reject) => {

        if (tableName) {
            let query = connectDB.query(`DELETE FROM ${tableName} ORDER BY id DESC LIMIT ${limitNumber}`, (err, result) => {
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
    exist: exist,
    create: create,
    getId: getId,
    update: update,
    get: get,
    remove: remove,
    removeLastRows: removeLastRows
}