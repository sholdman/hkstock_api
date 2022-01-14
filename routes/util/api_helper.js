const axios = require("axios").default;

const getAAStockNews = async() => {

    var url = 'http://wdata.aastocks.com/datafeed/getaafnnews.ashx?platform=website&max=20&lang=tc&type=103,104,207,213,212,208,64,66,68';
    return axios.get(url).then(response => response.data);
}

module.exports = {
    getAAStockNews
}