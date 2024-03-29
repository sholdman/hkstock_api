var etnet_scraper = require('./etnet_scraper');
var moment = require('moment');

const singleQuote = async (stockCode) => {
    // const etnetUrl = "http://www.etnet.com.hk/www/tc/stocks/realtime/quote.php?code=" + stockCode;
    // const html = await fetchHtml(etnetUrl);
    // const selector = cheerio.load(html);

    // console.log("etnetUrl: " + etnetUrl);
    

    try {
        var selector = await etnet_scraper.scrapEtnetQuotePage(stockCode);

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
    } catch (error) {
        console.log(error);
        return { "error" : "Invalid stock code or error in parsing"};
    }
}

const multipleQuote = async (codeList) => {
    console.log('codeList: ' + codeList);
    var quotes = [];
    for (const code of codeList) {
        console.log('stockCode: ' + code);
        var quote = await singleQuote(code);
        quotes.push(quote);
    }

    return quotes;
}

const top20Quote = async (mainType, subType, version) => {
    
    if (mainType == undefined || subType == undefined) {
        return {"error" : "mainType and subType cannot be null"};
    }

    try {
        var selector = await etnet_scraper.scrapEtnetTop20(mainType, subType);

        // for common class
        const top20Content = selector("body").find("div #DivContent").find(".DivFigureContent");
        var quotes = extractTop20(top20Content, version);

        return quotes;
    } catch (error) {
        console.error(error);
    }
}

const getLocalIndices = async () => {
    var indices = {};

    try {
        var selector = await etnet_scraper.scrapEtnetLocalIndices();
        var indicesContent = selector("body").find(".DivFigureContent").find("tbody");
        var data = extractLocalIndices(indicesContent);

        indices["data"] = data;
        indices["timestamp"] = moment(new Date()).format('yyyyMMDDHHmm');

        return indices;
    } catch (error) {
        console.log(error);
    }
}

const extractLocalIndices = selector => {
    var data = [];
    // positon from frontend page
    // TODO: set by config
    var indexPosition = [3,4,5,6,7,8,9];

    for (i = 0; i < indexPosition.length; i++) {

        const nametc = selector.find("tr:eq(" + indexPosition[i] + ") td:eq(0)").text().trim();
        const nominal = selector.find("tr:eq(" + indexPosition[i] + ") td:eq(1)").text().trim().replace(",", "");
        const change = selector.find("tr:eq(" + indexPosition[i] + ") td:eq(2)").text().trim();
        const changePct = selector.find("tr:eq(" + indexPosition[i] + ") td:eq(3)").text().trim();
        const open = selector.find("tr:eq(" + indexPosition[i] + ") td:eq(5)").text().trim().replace(",", "");
        const high = selector.find("tr:eq(" + indexPosition[i] + ") td:eq(6)").text().trim().replace(",", "");
        const low = selector.find("tr:eq(" + indexPosition[i] + ") td:eq(7)").text().trim().replace(",", "");
        // indexconstituents: index constituents array with stock code
        data.push({ nametc, nominal, change, changePct, open, high, low });

        // if content stockRatio column, rebuild index position arraylist
        if (selector.find("tr:eq(" + indexPosition[i] + ")").find("table").find(".ADUIBarup") != null) {
            for (j = i; j < indexPosition.length; j++) {
                indexPosition[j] = indexPosition[j] + 1;
            }
            // console.log('new index list: ' + indexPosition);
        }
    }
    return data;
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

const getRelatedStockCode = selector => {
    var relatedStockCode = [];
    // remove useless tr row
    var rowCount = selector.find("tr").length - 2;
    // one row have two related stock code
    for (i = 0; i < rowCount; i++) {
        for (j = -2; j < 2; j++) {
            if (j % 2 == 0) {
                var code = selector.find("tr:eq(" + i + ") a:eq(" + (j + 2) + ")").text().trim();
                if (code != null && code != "") {
                    relatedStockCode.push(code);
                }
            }
        }
    }

    return relatedStockCode;
}

const getStockDetail = selector => {
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

    return {
        bid, ask, sma10, sma20, sma50, sma100, sma250, noOfTransaction, ccy, high52w, low52w,
        boardLot, entryFee, rsi14, bidAskSpread, tenDayReturn, pe, yield, earningPerShare
    };
}

const extractTop20 = async (selector, version) => {
    console.log("extract top 20 content, type: " + version);
    var top20 = {};
    var rowCount = 20;
    const timestamp = moment(new Date()).format('DD/MM/YYYY hh:mm');

    if (version == 'basic') {
        var data = [];
        for (i = 1; i <= rowCount; i++) {
            var code = selector.find("tr:eq(" + i + ") td:eq(1)").text().trim();
            var tcName = selector.find("tr:eq(" + i + ") td:eq(2)").text().trim();
            var nominal = selector.find("tr:eq(" + i + ") td:eq(4)").text().trim();
            var change = selector.find("tr:eq(" + i + ") td:eq(5)").text().trim();
            var changePct = selector.find("tr:eq(" + i + ") td:eq(6)").text().trim();
            var high = selector.find("tr:eq(" + i + ") td:eq(7)").text().trim();
            var low = selector.find("tr:eq(" + i + ") td:eq(8)").text().trim();
            var turnover = selector.find("tr:eq(" + i + ") td:eq(9)").text().trim();
            var ccy = selector.find("tr:eq(" + i + ") td:eq(10)").text().trim();

            var quote = { code, tcName, nominal, change, changePct, high, low, turnover, ccy };
            // quotes.push(quote);
            data.push(quote);
        }

    } else if (version == 'full') {
        console.log('version -> detail');
        // TODO: formatting problem
        var codeList = [];
        for (i = 1; i <= rowCount; i++) {
            codeList.push(selector.find("tr:eq(" + i + ") td:eq(1)").text().trim());
        }
        top20 = await multipleQuote(codeList);
    } else {
        top20["errReason"] = "invalid version";
    }

    top20["timestamp"] = timestamp;
    top20["data"] = data;

    return top20;
}

module.exports = {
    singleQuote,
    multipleQuote,
    top20Quote,
    getLocalIndices
}