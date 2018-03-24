var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var express = require('express');
var app = express();
var port = 8000;



// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/hello/:searchString', function (req, res) {
    var START_URL = "http://www.ema.europa.eu/ema/";
    console.log(req.params.searchString);
    var SEARCH_WORD = req.params.searchString;
    var MAX_PAGES_TO_VISIT = 50;

    var pagesVisited = {};
    var numPagesVisited = 0;
    var pagesToVisit = [];
    var url = new URL(START_URL);
    var baseUrl = url.protocol + "//" + url.hostname;
  pagesToVisit.push(START_URL);
    crawl();

    function crawl() {
      if(numPagesVisited >= MAX_PAGES_TO_VISIT) {
        console.log("Reached max limit of number of pages to visit.");
          return;
      }
      var nextPage = pagesToVisit.pop();
      if (nextPage in pagesVisited) {
        // We've already visited this page, so repeat the crawl
        crawl();
      } else {
        // New page we haven't visited
        visitPage(nextPage, crawl);
      }
    }

    function visitPage(url, callback) {
      // Add page to our set
      pagesVisited[url] = true;
      numPagesVisited++;

      // Make the request
      //console.log("Visiting page " + url);
        if(url == undefined){
            console.log("Sorry could not find the word")
        }
      request(url, function(error, response, body) {
         // Check status code (200 is HTTP OK)
         //console.log("Status code: " + response.statusCode);
         if(response.statusCode !== 200) {
           callback();
           return;
         }
         // Parse the document body
         var $ = cheerio.load(body);
         var isWordFound = searchForWord($, SEARCH_WORD);
         if(isWordFound) {
            console.log('Word ' + SEARCH_WORD + ' found at page ' + url);
             console.log($('html > body').text().toLowerCase());
            res.send($('html > body').text().toLowerCase());
         } else {
           collectInternalLinks($);
           // In this short program, our callback is just calling crawl()
           callback();
         }
      });
    }

    function searchForWord($, word) {
      var bodyText = $('html > body').text().toLowerCase();
      return(bodyText.indexOf(word.toLowerCase()) !== -1);
    }

    function collectInternalLinks($) {
        var relativeLinks = $("a[href^='/']");
        //console.log("Found " + relativeLinks.length + " relative links on page");
        relativeLinks.each(function() {
            pagesToVisit.push(baseUrl + $(this).attr('href'));
        });
    }
})

app.listen(port);
console.log('server is listening on '+ port);

