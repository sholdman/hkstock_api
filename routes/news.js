var etnet_scraper = require('./etnet_scraper');
var moment = require('moment');
var api_helper = require('./util/api_helper');

const getTotalRelatedNewsPage = async (stockCode) => {
    try {
        var selector = await etnet_scraper.scrapEtnetRelatedStockcodeNews(stockCode, -1);
        var pageCount = selector("body").find(".DivArticlePagination").find("a").length + 1;
        console.log('pageCount: ' + pageCount);
        return pageCount;
    } catch (error) {
        console.log(error);
    }
}

const getTotalNewsPage = async (category) => {
    try {
        var selector = await etnet_scraper.scrapEtnetNews(category, -1);
        var pageCount = selector("body").find(".DivArticlePagination").find("a").length + 1;
        console.log('pageCount: ' + pageCount);
        return pageCount;
    } catch (error) {
        console.log(error);
    }
}

// get latest 100 news
const relatedCodeNewsList = async (stockCode, limit) => {
    var max = limit ? limit : 100;
    var count = 0;
    let news = {};
    let result = [];

    try {
        // get total number of news page
        var pageCount = await getTotalRelatedNewsPage(stockCode);

        // loop etnet news page with param 'page'
        for (page = 1; page <= pageCount; page++) {
            var selector = await etnet_scraper.scrapEtnetRelatedStockcodeNews(stockCode, page);
            var noOfNewsInPage = selector("body").find("#DivContent").find("div .DivArticleBox").find(".DivArticleList").length + 1;
            console.log("noOfNewsInPage: " + noOfNewsInPage);

            for (i = 0; i < noOfNewsInPage; i++) {
                let newsId = String(selector("body").find("#DivContent").find("div .DivArticleBox")
                                .find(".DivArticleList.dotLine:eq(" + i + ")").find("a").attr('href'))
                                .replace('quote_news_detail.php?newsid=','');
                    newsId = newsId.substring(0, newsId.indexOf('&'));
                let headline = selector("body").find("#DivContent").find("div .DivArticleBox")
                                .find(".DivArticleList.dotLine:eq(" + i + ")").find("a").text().trim();
                let timestamp = selector("body").find("#DivContent").find("div .DivArticleBox")
                                .find(".DivArticleList.dotLine:eq(" + i + ")").find(".date").text().trim();
                if (newsId && headline && timestamp) {
                    result.push({ newsId, headline, timestamp });
                }
                count++;
                if (count > max)
                    break;
            }
            if (count > max)
                break;
        }
        
        news["result"] = result;
        news["timestamp"] = moment(new Date()).format('DD/MM/YYYY hh:mm');
        return news;
    } catch (error) {
        console.log(error);
    }
}

// get etnet news content
const getETNetNewsContent = async (newsId) => {
    var news = {};

    try {
        var selector = await etnet_scraper.scraptEtnetNewsContent(newsId);
        let headline = selector("body").find("#DivContent").find("div .DivArticleBox > .DivArticleList > .ArticleHdr").text().trim();
        let content = selector("body").find("#DivContent").find("div .DivArticleBox > .DivArticleContent > #NewsContent").text().trim();
        let timestamp = selector("body").find("#DivContent").find("div .DivArticleBox > .DivArticleList > .date").text().trim();

        news["newsId"] = newsId;
        news["headline"] = headline;
        news["content"] = content;
        news["timestamp"] = moment(new Date()).format('yyyyMMDDHHmm');
        
        return news;
    } catch {
        console.log(error);
    }
}

// get aastock news content
const getAAStockNewsContent = async (newsId) => {
    var news = {};

    var selector = await etnet_scraper.scrapAAStockNewsContent(newsId);
    let headline = selector("body").find(".newshead5").text().trim();
    let content = selector("body").find(".newscontent5").text().trim();
    let timestamp = selector("body").find(".newstime5").text().trim();

    news["newsId"] = newsId;
    news["headline"] = headline;
    news["content"] = content;
    news["timestamp"] = moment(Date.parse(timestamp)).format('yyyyMMDDHHmm');
    
    return news;
}

const getNewsContentBySource = async (newsId, source) => {
    var news = {};
    
    if (source == "etnet") {
        news = getETNetNewsContent(newsId);
    } else if (source = "aastock") {
        news = getAAStockNewsContent(newsId);
    }
    
    return news;
}

// get latest 100 news in category (default: all)
const NewsListByCategory = async (category) => {
    var max = 100;
    var count = 0;
    let news = {};
    let result = [];

    try {
        // get total number of news page
        var pageCount = await getTotalNewsPage(category);

        // loop etnet news page with param 'page'
        for (page = 1; page <= pageCount; page++) {
            var selector = await etnet_scraper.scrapEtnetNews(category, page);
            var noOfNewsInPage = selector("body").find("#DivContent").find("div .DivArticleBox").find(".DivArticleList").length + 1;
            console.log("noOfNewsInPage: " + noOfNewsInPage);

            for (i = 0; i < noOfNewsInPage; i++) {
                let newsId = String(selector("body").find("#DivContent").find("div .DivArticleBox")
                                .find(".DivArticleList.dotLine:eq(" + i + ")").find("a").attr('href'))
                                .replace('categorized_news_detail.php?newsid=','');
                    newsId = newsId.substring(0, newsId.indexOf('&'));
                let headline = selector("body").find("#DivContent").find("div .DivArticleBox")
                                .find(".DivArticleList.dotLine:eq(" + i + ")").find("a").text().trim();
                let timestamp = selector("body").find("#DivContent").find("div .DivArticleBox")
                                .find(".DivArticleList.dotLine:eq(" + i + ")").find(".date").text().trim();
                if (newsId && headline && timestamp) {
                    result.push({ newsId, headline, timestamp });
                }
                count++;
                if (count > max)
                    break;
            }
            if (count > max)
                break;
        }
        
        news["result"] = result;
        news["timestamp"] = moment(new Date()).format('DD/MM/YYYY hh:mm');
        return news;
    } catch (error) {
        console.error(error);
    }
}

const getAANews = async () => {
    let result = [];
    var jsonString = await api_helper.getAAStockNews();
    var newsList = jsonString["Data"];
    
    newsList.forEach(news => {
        var newsId = news["NewsID"];
        var title = news["Title"];
        var timestamp = news["NewsTime"];
        result.push({ newsId, title, timestamp });
    });

    return result;
}

module.exports = {
    relatedCodeNewsList,
    getTotalRelatedNewsPage,
    getETNetNewsContent,
    getNewsContentBySource,
    NewsListByCategory,
    getAANews,
    getAAStockNewsContent
}