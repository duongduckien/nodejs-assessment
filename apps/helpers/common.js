var isemail = require('isemail');

const getArrData = (arr, field) => {

    let result = [];

    if (arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            result.push(arr[i][field]);
        }
    }

    return result;

}

const uniqueArrData = (arrArg) => {
    return arrArg.filter((elem, pos, arr) => {
        return arr.indexOf(elem) == pos;
    });
}

const duplicateArrData = (arr, type) => {

    if (type === 'single') {
        return arr;
    }

    let result = [];

    arr.forEach((element, index) => {
        if (arr.indexOf(element, index + 1) > -1) {
            if (result.indexOf(element) === -1) {
                result.push(element);
            }
        }
    });

    return result;

}

const splitString = (str, char) => {
    return str.split(char);
}

const getEmailInArray = (arrStr) => {
    let arrEmail = [];
    if (arrStr.length > 0) {
        for (let i=0; i<arrStr.length; i++) {
            if (isemail.validate(arrStr[i].trim())) {
                arrEmail.push(arrStr[i]);
            }
        }
    }
    return arrEmail;
}

/**
 * Return error from SQL query
 */
const errorSQL = (err) => {
    if (err) return {type: 'SQL', error: err};
}

/**
 * Return error of application
 */
const errorApp = (err) => {
    if (err) return {type: 'APP', error: err};
}

module.exports = {
    getArrData: getArrData,
    uniqueArrData: uniqueArrData,
    duplicateArrData: duplicateArrData,
    splitString: splitString,
    getEmailInArray: getEmailInArray,
    errorSQL: errorSQL,
    errorApp: errorApp
}