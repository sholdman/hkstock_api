var express = require('express');
const quote = require('./quote');
const news = require('./news');
var router = express.Router();

router.get('/quote', async function (req, res) {
    console.log('req stockcode: ' + req.query.code);
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

router.get('/top20', async function (req, res) {
    console.log('mainType: ' + req.query.mainType + ", subType: " + req.query.subType);
    mainType = req.query.mainType;
    subType = req.query.subType;
    version = req.query.version ? req.query.version : 'basic';
    var result = await quote.top20Quote(mainType, subType, version);
    res.json(result);
});

// param 1. lang, 2. code
// http://www.etnet.com.hk/www/tc/stocks/realtime/quote_news_list.php?section=related&code=700
// news api
router.get('/news', async function (req, res) {
    console.log('stockcode: ' + req.query.code);
    let code = req.query.code;
    var result = await news.relatedCodeNewsList(code);
    res.json(result);
});

// local or world indices api
router.get('/test', async function (req, res) {
    console.log('code: ' + req.query.code);
    var code = req.query.code
    var total = await news.getTotalRelatedNewsPage(code);
    console.log("total: " + total);
    res.json('total: ' + total);
});


module.exports = router;
