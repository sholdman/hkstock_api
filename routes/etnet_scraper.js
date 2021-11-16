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
    const searchResults = selector("body").find("#UnderSkinnerDiv");
    const quote = extractQuote(searchResults);

    return quote;
}

const multipleQuote = async (stockCode) => {
    const etnetUrl = "http://www.etnet.com.hk/www/tc/stocks/realtime/quote.php?code=" + stockCode;
    const html = await fetchHtml(etnetUrl);
    const selector = cheerio.load(html);

    console.log("etnetUrl: " + etnetUrl);
    const searchResults = selector("body").find("#UnderSkinnerDiv");
    const quote = extractQuote(searchResults);
    const quote2 = extractQuote(searchResults);
    var data = [];
    data.push(quote);
    data.push(quote2);
    return data;
}

const extractQuote = selector => {
    console.log("test....");
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

module.exports = {
    singleQuote,
    multipleQuote
};