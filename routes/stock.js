var express = require('express');
const quote = require('./quote');
const news = require('./news');
var router = express.Router();

// quote api (single/multiple)
// eg. http://127.0.0.1:3000/stock/quote?code={code}
// eg. http://127.0.0.1:3000/stock/quote?code={code,code,code}
router.get('/quote', async function (req, res) {
    codeList = req.query.code.split(",");
    var result;
    if (req.query.code && codeList.length == 1) { // check if stockcode is empty
        result = await quote.singleQuote(codeList[0]);
    } else {
        console.log('codeList: ' + codeList);
        result = await quote.multipleQuote(codeList);
    }
    res.json(result);
});

// top20 api
// eg. http://127.0.0.1:3000/stock/top20?mainType={stock|war|cbbc}&subType={turnover|up|down|volume}&version={basic|full}
router.get('/top20', async function (req, res) {
    console.log('mainType: ' + req.query.mainType + ", subType: " + req.query.subType);
    mainType = req.query.mainType;
    subType = req.query.subType;
    version = req.query.version ? req.query.version : 'basic';
    var result = await quote.top20Quote(mainType, subType, version);
    res.json(result);
});

// local indices api
// eg. http://127.0.0.1:3000/stock/local_indices
router.get('/local_indices', async function (req, res) {
    var result = await quote.getLocalIndices();
    res.json(result);
});

// param 1. lang, 2. code 3.limit
// http://www.etnet.com.hk/www/tc/stocks/realtime/quote_news_list.php?section=related&code=700
// eg. http://127.0.0.1:3000/stock/news_list_related_code?code={code}&limit={numberOfNews}
router.get('/news_list_related_code', async function (req, res) {
    console.log('stockcode: ' + req.query.code + ', limit: ' + req.query.limit);
    let code = req.query.code;
    let limit = req.query.limit;
    var result = await news.relatedCodeNewsList(code, limit);
    res.json(result);
});

// TODO: sector news
// Phase 1: all news
// https://www.etnet.com.hk/www/tc/news/categorized_news.php?page=2&category=latest
// eg. http://127.0.0.1:3000/stock//news_list?category={category}
router.get('/news_list', async function (req, res) {
    console.log('category: ' + req.query.category);
    let category = req.query.category;
    var result = await news.NewsListByCategory(category);
    var result_aastock = await news.getAANews();

    result["result"] = result["result"].concat(result_aastock);
    res.json(result);
});


// news content api
// http://127.0.0.1:3000/stock/news_content?newsId={newsId}
router.get('/news_content', async function(req, res) {
    let newsId = req.query.newsId;
    let source = req.query.source ? req.query.source : "etnet";
    var result;
    
    if (!source) {
        result = await news.getNewsContent(newsId);
    } else {
        result = await news.getNewsContentBySource(newsId, source);
    }
    res.json(result)
})

// local or world indices api

// test api
router.get('/test', async function (req, res) {
    console.log('code: ' + req.query.code);
    var code = req.query.code
    var total = await news.getTotalRelatedNewsPage(code);
    console.log("total: " + total);
    res.json('total: ' + total);
});

// TODO:
// TODO: reques from GET to POST

module.exports = router;
