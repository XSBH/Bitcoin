var request = require('request');
var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, '../public')));

var prices = {};

var getPrices = function() {
    console.log("retrieving prices from bitcoinaverage.com now ...");
    request('https://api.bitcoinaverage.com/ticker/global/CAD/last',
        function(err, resp, body) {
	    if(!err && resp.statusCode == 200){
		prices['CAD'] = body;
	    }
	});
    request('https://api.bitcoinaverage.com/ticker/global/USD/last',
        function(err, resp, body) {
	    if(!err && resp.statusCode == 200){
		prices['USD'] = body;
	    }
	});
    request('https://api.bitcoinaverage.com/ticker/global/CLP/last',
        function(err, resp, body) {
	    if(!err && resp.statusCode == 200){
		prices['CLP'] = body;
	    }
	});
    prices['time'] = new Date();
}

setInterval(getPrices, 60 * 1000);
getPrices();

app.get('/', function(req, res) {
    res.sendFile(path.join(path.join(__dirname, 'views'), 'index.html'));
});

app.get('/bitcon', function(req, res) {
	getPrices();
    console.log(prices);
    res.json(prices);
});

module.exports = app;
