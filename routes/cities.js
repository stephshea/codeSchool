//file contains all city date and logic
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({
	extended: false
});
var cities = {
	'Providence': 'RI',
	'Braintree': 'MA',
	'Putnam': 'CT',
	'Dallas': 'TX',
	'Jacksonville': 'FL',
	'Boise': 'ID',
	'Chicago': 'IL'
};
router.route('/')
	//root path is relative to path where this router is mounted in app.js app.use(/'cities',...)
	.get(function(request, response) {
		// citiesRoute.get(function(request, response)
		if (request.query.limit > cities.length) {
			response.json("Limit can't be over " + cities.length)
		} else if (request.query.limit > 0) {
			response.json(cities.slice(0, request.query.limit));
		} else {
			response.json(Object.keys(cities));
			//linked cities displaying on index.html
		}
	}).post(parseUrlencoded, function(request, response) {
		var createCity = function(city, state) {
			cities[city] = state;
			return city;
		};
		if (request.body.city.length >= 4 && request.body.state.length >= 2) {
			request.body.city = request.body.city[0].toUpperCase() + request.body.city.slice(1).toLowerCase();
			request.body.state = request.body.state[0].toUpperCase() + request.body.state.slice(1).toLowerCase();
			var newCity = createCity(request.body.city, request.body.state);
			response.status(201).json(newCity);
		} else {
			console.log('error');
			response.status(400).json('City must have at least 4 letters; state 2')
		}
	});
router.route('/:name').all(function(request, reponse, next) {
	var name = request.params.name;
	var city = name[0].toUpperCase() + name.slice(1).toLowerCase();
	request.cityName = city;
	next();
}).get(function(request, response) {
	var state = cities[request.cityName];
	if (state) {
		response.json(state);
	} else {
		response.status(404).json('No state found for ' + request.params.state);
		// response.json(Object.keys(cities));
	}
}).delete(function(request, response) {
	delete cities[request.cityName];
	response.sendStatus(200);
});
module.exports = router;