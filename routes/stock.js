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
    code = req.query.code.split(",");
    var result;
    if (req.query.code && code.length == 1) { // check if stockcode is empty
        result = await etnet.singleQuote(code[0]);
    } else {
        result = {"TODO": "TODO"};
        result = await etnet.multipleQuote(code[0]);
    }
    res.json(result);
});


module.exports = router;
