var moment = require('moment');

const getCurrentTimestamp = () => {
    var date = new Date();
    var timestamp = moment(date).format('YYYYMMDDhhmmss');
    // eg. 20220116112539

    return timestamp;
}

module.exports = {
    getCurrentTimestamp
}