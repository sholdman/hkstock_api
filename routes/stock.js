var express = require('express');
const etnet = require('./etnet_scraper');
var router = express.Router();

router.get('/', function (req, res, next) {
    const start = async function () {
        const result = await etnet.scrapEtnet(700);
        res.json(result);
    }
    start();
})

module.exports = router;
