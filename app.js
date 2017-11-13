var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var cars = require('./routes/cars');

var request = require('request');
var xml2js = require('xml2js');
var parseString = xml2js.parseString;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client/build')));

// app.use('/', index);
// app.use('/users', users);
// app.use('/cars', cars);

app.get('/cars/*', (req, res) => {
  const queries = req.query;
  // const apiKey = process.env.API_KEY;
  const apiKey = 's9fen76swqufsd6ht4qacsnh';
  const fullUrl = `http://api.hotwire.com/v1/search/car?apikey=${apiKey}&dest=${queries.dest}&startdate=${queries.startdate}&enddate=${queries.enddate}&pickuptime=${queries.pickuptime}&dropofftime=${queries.dropofftime}`;
  request(
    fullUrl,
    (error, response, body) => {
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
          errorMessage: `Sorry, Hotwire is currently unavailable.
          Give us a minute and try again.`,
        });
      }
    }
  );
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
