var express = require('express');
var http = require('http');
var router = express.Router();
var request = require('request');
var xml2js = require('xml2js');

var parseString = xml2js.parseString;

/* GET users listing. */
router.get('/', function(req, res, next) {
    request('http://api.hotwire.com/v1/search/car?apikey=s9fen76swqufsd6ht4qacsnh&dest=LAX&startdate=11/14/2017&enddate=11/15/2017&pickuptime=10:00&dropofftime=13:30', 
        function(error, response, body) {
            if (!error && response.statusCode === 200) {
                parseString(body, (err, result) => {
                  const cars = result.Hotwire.Result[0].CarResult.map((car) => {
                    const flattenedCar = {};
                    Object.keys(car).forEach((key) => {
                      if (Array.isArray(car[key]) && car[key].length < 2) {
                        flattenedCar[key] = car[key][0];
                      }
                    });
                    return flattenedCar;
                  });
                  res.json({ op: 'carssearch', success: true, cars });
                });
              } else {
                res.json({
                  op: 'carssearch',
                  success: false,
                  errorMessage: `Sorry, Hotwire is currently unavailable.`,
                });
              };
        }
    )
});

module.exports = router;
