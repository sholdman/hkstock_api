var api_helper = require('./util/api_helper');
var date_util = require('./util/date_util');

const singleQuote = async (stockCode) => {

    console.log(new Date());
    var timestamp = date_util.getCurrentTimestamp();
    console.log('timestamp: ' + timestamp);
    var data = await api_helper.quoteSearch("AAPL", timestamp);
    console.log('data: ' + data);

    // var quote = extractQuote(searchResults);

    quote = Object.assign({}, quote);
    return quote;
}

const extractQuote = selector => {
    const code = selector.find("#StkQuoteHeader").text().trim().split(' ')[0];
    const tcName = selector.find("#StkQuoteHeader").text().trim().split(' ')[1];
    const nominal = selector.find("#StkDetailMainBox").find(".Price").text().trim();
    const changeSector = selector.find("#StkDetailMainBox").find(".Change").text().trim().split(' ');
    const change = changeSector[0];
    const changePct = changeSector[1].replace("(", "").replace(")", "");
    const high = selector.find("#StkDetailMainBox").find("tr:eq(0) td:eq(1)").find(".Number").text().trim();
    const transaction = selector.find("#StkDetailMainBox").find("tr:eq(0) td:eq(2)").find(".Number").text().trim();
    const prevClose = selector.find("#StkDetailMainBox").find("tr:eq(0) td:eq(3)").find(".Number").text().trim();
    const oneMonthHigh = selector.find("#StkDetailMainBox").find("tr:eq(0) td:eq(4)").find(".Number").text().trim();
    const marketCap = selector.find("#StkDetailMainBox").find("tr:eq(0) td:eq(5)").find(".Number").text().trim();
    const low = selector.find("#StkDetailMainBox").find("tr:eq(1) td:eq(0)").find(".Number").text().trim();
    const turnover = selector.find("#StkDetailMainBox").find("tr:eq(1) td:eq(1)").find(".Number").text().trim();
    const open = selector.find("#StkDetailMainBox").find("tr:eq(1) td:eq(2)").find(".Number").text().trim();
    const oneMonthLow = selector.find("#StkDetailMainBox").find("tr:eq(1) td:eq(3)").find(".Number").text().trim();
    const shortSell = selector.find("#StkDetailMainBox").find("tr:eq(1) td:eq(4)").find(".date").text().trim() +
        selector.find("#StkDetailMainBox").find("tr:eq(1) td:eq(4)").find(".Number").text().trim();

    return { code, tcName, nominal, change, changePct, high, low, transaction, turnover, prevClose, open, oneMonthHigh, oneMonthLow, marketCap, shortSell };
}

module.exports = {
    singleQuote
}