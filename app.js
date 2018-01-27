var express = require('express');
var app = express();
app.use(express.static('public'));
var logger = require('./logger');
app.use(logger);
var cities = require('./routes/cities');
app.use('/cities', cities);
app.get('/', function(request, response) {
	response.send('Hello world');
});
app.get('/name', function(request, response) {
	var name = 'Stephanie';
	response.send(name);
});
app.get('/surprise', function(request, response) {
	response.send('Surprise!');
});
app.get('/redirect', function(request, response) {
	response.redirect(301, '/surprise');
});
app.get('/date', function(request, response) {
	var date = new Date();
	response.send('It is ' + date);
});
app.listen(process.env.PORT);