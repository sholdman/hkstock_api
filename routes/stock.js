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
        result = {"TODO": "TODO"};
        result = await quote.multipleQuote(codeList);
    }
    // res.json({"test":"test"});
    res.json(result);
});

router.get('/top20', async function (req, res) {
    console.log('type: ' + req.query.type);
    type = req.query.type;
    version = req.query.version ? req.query.version : 'basic';
    var result = await quote.top20Quote(type, version);
    res.json(result);
})


module.exports = router;
