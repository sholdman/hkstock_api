var express = require('express');
const quote = require('./quote');
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

// local or world indices api
router.get('/test', function (req, res) {
    // console.log('type: ' + req.query.type);
    // type = req.query.type;
    // version = req.query.version ? req.query.version : 'basic';
    // var result = quote.top20QuoteTest(type, version);
    // res.json(result);
});


module.exports = router;
