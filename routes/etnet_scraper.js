const axios = require("axios").default;
const cheerio = require("cheerio");
const pretty = require("pretty");

const fetchHtml = async url => {
    try {
        const { data } = await axios.get(url, {
            headers: {
                Referer: 'http://www.etnet.com.hk/www/tc/home/index.php'
            }
        });
        return data;
    } catch {
        `ERROR: An error occurred while trying to fetch the URL: ${url}`
    }
}

const singleQuote = async (stockCode) => {
    const etnetUrl = "http://www.etnet.com.hk/www/tc/stocks/realtime/quote.php?code=" + stockCode;
    const html = await fetchHtml(etnetUrl);
    const selector = cheerio.load(html);

    console.log("etnetUrl: " + etnetUrl);


    // for common class
    const searchResults = selector("body").find("#UnderSkinnerDiv");
    var quote = extractQuote(searchResults);

    // for stock detail
    const stockDetailSelector = selector("body").find("div #StkDetailColB > #StkList");
    var stockDetail = getStockDetail(stockDetailSelector);

    // for related stockcode
    const relatedStockCodeSelector = selector("body").find("div #DivContentRight > div:eq(8)");
    var relatedStockCode = getRelatedStockCode(relatedStockCodeSelector);

    quote = Object.assign({}, quote, stockDetail);

    // TODO: formatter class
    quote["relatedStockCode"] = relatedStockCode;

    return quote;
}

const multipleQuote = async (codeList) => {
    console.log('codeList: ' + codeList);
    var quotes = [];
    for (const code of codeList ) {
        console.log('stockCode: ' + code);
        var quote = await singleQuote(code);
        quotes.push(quote);
    }

    return quotes;
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

    console.log("nominal: " + nominal + ", change: " + change + ", high: " + high);
    return { code, tcName, nominal, change, changePct, high, low, transaction, turnover, prevClose, open, oneMonthHigh, oneMonthLow, marketCap, shortSell };
}

const getRelatedStockCode = selector => {
    console.log("getRelatedStockCode...");
    var relatedStockCode = [];
    // remove useless tr row
    var rowCount = selector.find("tr").length - 2;
    // one row have two related stock code
    for (i = 0; i < rowCount; i++) {
        for (j = -2; j < 2; j++) {
            if (j % 2 == 0) {
                var code = selector.find("tr:eq(" + i +") a:eq(" + (j + 2) + ")").text().trim();
                if (code != null && code != "") {
                    relatedStockCode.push(code);
                }
            }   
        }
    }
    console.log('relatedStockcode: ' + relatedStockCode);
    console.log('rowCount: ' + rowCount);
    return relatedStockCode;
}

const getStockDetail = selector => {
    console.log("getStockDetail...");
    const bid = selector.find("li:eq(1)").text().trim();
    const sma10 = selector.find("li:eq(3)").text().trim();
    const ask = selector.find("li:eq(5)").text().trim();
    const sma20 = selector.find("li:eq(7)").text().trim();
    const noOfTransaction = selector.find("li:eq(9)").text().trim();
    const sma50 = selector.find("li:eq(11)").text().trim();
    // TODO: 每宗成交金額
    const sma100 = selector.find("li:eq(15)").text().trim();
    // TODO: 加權平均價
    const sma250 = selector.find("li:eq(19)").text().trim();
    const ccy = selector.find("li:eq(21)").text().trim();
    const high52w = selector.find("li:eq(23)").text().trim();
    const boardLot = selector.find("li:eq(25)").text().trim();
    const low52w = selector.find("li:eq(27)").text().trim();
    const entryFee = selector.find("li:eq(29)").text().trim();
    const rsi14 = selector.find("li:eq(31)").text().trim();
    const bidAskSpread = selector.find("li:eq(33)").text().trim();
    const tenDayReturn = selector.find("li:eq(35)").text().trim();
    const pe = selector.find("li:eq(37)").text().trim();
    const yield = selector.find("li:eq(41)").text().trim();
    const earningPerShare = selector.find("li:eq(45)").text().trim();

    return { bid, ask, sma10, sma20, sma50, sma100, sma250, noOfTransaction, ccy, high52w, low52w,
             boardLot, entryFee, rsi14, bidAskSpread, tenDayReturn, pe, yield, earningPerShare};
}

module.exports = {
    singleQuote,
    multipleQuote
};