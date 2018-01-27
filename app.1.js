var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false});

var cities = {
	'Providence': 'RI',
	'Braintree': 'MA',
	'Putnam': 'CT',
	'Dallas': 'TX',
	'Jacksonville': 'FL',
	'Boise': 'ID',
	'Chicago': 'IL',
	'test': 'Test'
};

app.post('/cities', parseUrlencoded, function(request, response) {
    // var newCity = createCity();
    if(request.body.newCity.length >=4 && request.body.newCity.state.length >=2){
    // var newCity = request.body;
    var newCity = createCity[request.body.name, request.body.state];
    cities[newCity.name] = newCity.state;
    response.status(201).json(newCity.name);
}
else {
    response.status(400).json("City must have at least 4 letters; state 2");
}
});


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
		response.status(404).json(request.params.name + " not found");
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