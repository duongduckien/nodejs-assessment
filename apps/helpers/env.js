var fs = require('fs');

const get = (name) => {

    let data = JSON.parse(fs.readFileSync('config/environment.json'));

    if (name.includes('.')) {
        
        let arr = name.split('.');

        if (arr.length > 0) {
            for (let i = 0; i < arr.length; i++) {
                data = data[arr[i]];
            }
        }
        
        return data;

    }

    return data[name];
}

module.exports = {
    get: get
}