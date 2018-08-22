var env = require('../helpers/env');
var mysql = require('mysql');

var connectDB = mysql.createConnection({
    host: env.get('nodeJSAssessment.host'),
    user: env.get('nodeJSAssessment.user'),
    password: env.get('nodeJSAssessment.password'),
    database: env.get('nodeJSAssessment.database')
});

connectDB.connect();

function getConnectDB() {
    if (!connectDB) {
        connectDB.connect();
    }
    return connectDB;
}

module.exports = {
    getConnectDB: getConnectDB
}