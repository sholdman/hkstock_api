var express = require('express');
const etnet = require('./etnet_scraper');
var router = express.Router();

// router.get('/quote', function (req, res, next) {
//     var code = 700;
//     const start = async function (req, res) {
//         // console.log('req code: ' + req.params.code);
//         console.log('req code: ' + req.query("code"));
//         code = 700;
//         const result = await etnet.scrapEtnet(code);
//         res.json(result);
//     }
//     start();
// })

router.get('/quote', async function (req, res) {
    // console.log('req code: ' + req.body.code);
    console.log('req stockcode: ' + req.query.code);
    codeList = req.query.code.split(",");
    var result;
    if (req.query.code && codeList.length == 1) { // check if stockcode is empty
        result = await etnet.singleQuote(codeList[0]);
    } else {
        result = {"TODO": "TODO"};
        result = await etnet.multipleQuote(codeList);
    }
    res.json(result);
});


module.exports = router;
