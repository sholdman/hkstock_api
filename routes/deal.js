var express = require('express');
const scraper = require('./scraper');
var router = express.Router();

/* GET deal  */
router.get('/', function (req, res, next) {
    //   res.render('index', { title: 'Express' });
    const start = async function () {
        const result = await scraper.scrapSteam();
        res.send(result);
    }
    start();
})

module.exports = router;
