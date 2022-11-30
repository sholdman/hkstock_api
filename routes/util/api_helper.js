const axios = require("axios").default;

const getAAStockNews = async() => {

    var url = 'http://wdata.aastocks.com/datafeed/getaafnnews.ashx?platform=website&max=20&lang=tc&type=103,104,207,213,212,208,64,66,68';
    return axios.get(url).then(response => response.data);
}

const quoteSearch = async(code, timestamp) => {
    var url = 'http://fctdata.aastocks.com/g2ce/Quote/getQuote?format=text&u=13&t='+timestamp+'&d=07DD98FB&grp0=AAPL.US%7C127&grp1=AAPL.US%7C3%2C-1%2C28'
    return axios.get(url).then(response => response.data);
}

module.exports = {
    getAAStockNews,
    quoteSearch
}