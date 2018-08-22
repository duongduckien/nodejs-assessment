
const getCurrentDate = () => {

    let date = new Date();

    let result = {
        seconds: date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds().toString(),
        minutes: date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes().toString(),
        hours: date.getHours() < 10 ? '0' + date.getHours() : date.getHours().toString(),
        day: date.getDate() < 10 ? '0' + date.getDate() : date.getDate().toString(),
        month: date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth().toString(),
        year: date.getFullYear().toString()
    }

    return result;

}

module.exports = {
    getCurrentDate: getCurrentDate
}