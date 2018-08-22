var fs = require('fs');
var config = require('config');
var os = require('os');
var dateTime = require('./dateTime');

var logsPath = config.get('logsPath');

const checkExistLog = (type) => {

    let fileName = createFileName(dateTime.getCurrentDate().day, dateTime.getCurrentDate().month, dateTime.getCurrentDate().year, type);

    if (fs.existsSync(logsPath + fileName)) {
        return true;
    }

    return false;

}

const createFile = (content, type) => {

    let fileName = createFileName(dateTime.getCurrentDate().day, dateTime.getCurrentDate().month, dateTime.getCurrentDate().year, type);

    if (checkExistLog(type)) {

        let dataOld = fs.readFileSync(logsPath + fileName, 'utf8');

        let dataNew = dataOld + formatLog(content);

        fs.writeFileSync(logsPath + fileName, dataNew);

    } else {

        let data = formatLog(content);

        fs.writeFileSync(logsPath + fileName, data);

    }

}

const createFileName = (day, month, year, type) => {
    let fileName = `${year}_${month}_${day}_${type}.log`;
    return fileName;
}

const formatLog = (content) => {

    let logContent = `====================${os.EOL}` +
        `* Created time: ${dateTime.getCurrentDate().year}-${dateTime.getCurrentDate().month}-${dateTime.getCurrentDate().day} ${dateTime.getCurrentDate().hours}:${dateTime.getCurrentDate().minutes}:${dateTime.getCurrentDate().seconds} ${os.EOL}` +
        `* Content: ${content}${os.EOL}` +
        `====================${os.EOL}`;

    return logContent;

}

module.exports = {
    checkExistLog: checkExistLog,
    createFile: createFile,
    createFileName: createFileName,
    formatLog: formatLog
}