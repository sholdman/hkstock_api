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

const scrapEtnetQuotePage = async (stockCode) => {
    const etnetUrl = 'http://www.etnet.com.hk/www/tc/stocks/realtime/quote.php?code=' + stockCode;
    const html = await fetchHtml(etnetUrl);
    const selector = cheerio.load(html);
    console.log("scrapEtnet, etnetUrl: " + etnetUrl);

    return selector;
}

const scrapEtnetTop20 = async (mainType, subType) => {
    var etnetUrl;

    switch (mainType) {
        case "stock":
            console.log('mainType Stock...');
            etnetUrl = 'http://www.etnet.com.hk/www/tc/stocks/realtime/top20.php?subtype=' + subType;
            break;
        case "war":
            console.log('mainType warrant...');
            etnetUrl = 'http://www.etnet.com.hk/www/tc/warrants/realtime/top20.php?maintype=war&subtype=' + subType;
            break;
        case "cbbc":
            console.log('mainType CBBC...');
            etnetUrl = 'http://www.etnet.com.hk/www/tc/warrants/realtime/top20.php?maintype=cbbc&subtype=' + subType;
    }

    const html = await fetchHtml(etnetUrl);
    const selector = cheerio.load(html);
    console.log("top20 url: " + etnetUrl);
    return selector;
}

const scrapEtnetRelatedStockcodeNews = async (stockCode, page) => {
    let etnetNewsUrl = 'http://www.etnet.com.hk/www/tc/stocks/realtime/quote_news_list.php?section=related&code=' + stockCode;
    if (page > 0) {
        etnetNewsUrl = etnetNewsUrl + "&page=" + page;
    }

    const html = await fetchHtml(etnetNewsUrl);
    const selector = cheerio.load(html);
    console.log("related news url: " + etnetNewsUrl);
    return selector;
}

const scraptEtnetNewsContent = async (newsId) => {
    let etnetNewsUrl = 'https://www.etnet.com.hk/www/tc/stocks/realtime/quote_news_detail.php?newsid=' + newsId + '&code=' + 1;

    const html = await fetchHtml(etnetNewsUrl);
    const selector = cheerio.load(html);
    console.log("news content url: " + etnetNewsUrl);
    return selector;
}

module.exports = {
    scrapEtnetQuotePage,
    scrapEtnetTop20,
    scrapEtnetRelatedStockcodeNews,
    scraptEtnetNewsContent
};