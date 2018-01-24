var express = require('express');
var app = express();
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
app.use(express.static('public'));
// instead of static can use app.get('/cities', function(request, response) {
//     response.sendFile(__dirname + '/public/index.html')
// });
app.get('/cities', function(request, response) {
	//  var cities = ['Providence', 'Boston', 'Dallas', 'Jacksonville', 'Boise'];
	if (request.query.limit >= 0) {
		response.json(cities.slice(0, request.query.limit));
	} else if (request.query.limit > cities.length) {
		response.status(404).json('your query was too large' + request.params.name);
		console.log("error");
	} else {
		response.json(cities);
	}
});
var cities = {
	'Providence': 'RI',
	'Boston': 'MA',
	'Dallas': 'TX',
	'Jacksonville': 'FL',
	'Boise': 'ID',
	'test': 'Test'
};
app.param('name', function(request, response, next) {
	var name = request.params.name;
	var city = name[0].toUpperCase() + name.slice(1).toLowerCase();
	request.cityName = city;
	next();
});
app.get('/cities/:name', function(request, response) {
	// var name = request.params.name;
	// var city = name[0].toUpperCase() + name.slice(1).toLowerCase();
	var state = cities[request.cityName];
	if (!state) {
		response.status(404).json("No city found" + request.params.name);
	} else {
		response.json(state);
	}
	console.log("hi");
});
// function parseCityName(name) {
//     var parsedName = name[0].toUpperCase() + name.slice(1).toLowerCase();
//     return parsedName;
//     }
app.listen(process.env.PORT);
