var express = require('express');
const scrapSteam = require('./scraper');
var router = express.Router();

/* GET deal  */
router.get('/', function (req, res, next) {
    //   res.render('index', { title: 'Express' });
    const start = async function () {
        const result = await scrapSteam();
        console.log("result: " + result);
        res.send(result);
    }
    start();
})

module.exports = router;
