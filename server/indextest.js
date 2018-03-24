var express = require('express');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var app = express();
var port = 8000;

var url ='http://google.com';

request(url,function(err,resp,body){
    if(err){
        console.log(err);
    }
    else{
        console.log(body);
    }
})
/*var str = "Hello my name is hello";
            var strArray = str.split(" ");
            var result = new Array();
            for (i = 0; i < strArray.length; i++) {
                var re = new RegExp(strArray[i], 'g');
                var n = str.match(re, "i").length;
                result[strArray[i]] = n;
            }
            console.log(result);*/

/*var url = "http://www.ema.europa.eu/ema/";

request(url,function(err,resp,body){
    var $ = cheerio.load(body);
    $('.medicine').filter(function(){
        
        
    })
})*/

app.listen(port);
console.log('server is listening on '+ port);
