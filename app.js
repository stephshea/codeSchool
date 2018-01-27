var express = require('express');
var app = express();

var logger = require('./logger');
app.use(logger);

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false});

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
// static defaults to serving index,html  -- instead of static can use app.get('/cities', function(request, response) {
//     response.sendFile(__dirname + '/public/index.html')
// });

app.delete('/cities/:name', function(request, response) {
    delete cities[request.cityName];
     response.sendStatus(200);
   
});

function parseCityName(name) {
    var parsedName = name[0].toUpperCase() + name.slice(1).toLowerCase();
    return parsedName;
    }

var createCity = function(city, state){
    cities[city] = state;
    return city; 
};

app.post('/cities', parseUrlencoded, function(request, response) {

    if(request.body.city.length >=4 && request.body.state.length >=2){
    request.body.city = request.body.city[0].toUpperCase() + request.body.city.slice(1).toLowerCase();
    request.body.state = request.body.state[0].toUpperCase() + request.body.state.slice(1).toLowerCase();
    var newCity = createCity(request.body.city, request.body.state);
         response.status(201).json(newCity);
    }
else {
    console.log('error');
    response.status(400).json('City must have at least 4 letters; state 2')
}
});

// app.use(function(request, response, next) {
//     if (request.path === "/cities") {
//         next();
//     } else {
//         response.status(404).json("Path requested does not exist");
//     }    
// });
//above needed?

var cities = {
	'Providence': 'RI',
	'Braintree': 'MA',
	'Putnam': 'CT',
	'Dallas': 'TX',
	'Jacksonville': 'FL',
	'Boise': 'ID',
	'Chicago': 'IL'
};

app.param('name', function(request, response, next) {
// 	var name = request.params.state;
	request.cityName = parseCityName(request.params.name);
	next();
});

app.get('/cities/:name', function(request, response) {
    
    var state = cities[request.cityName];
    if(state) {
    response.json(state);
    } else {
            response.status(404).json('No state found for ' +request.params.state);
        // response.json(Object.keys(cities));
    } 
});

app.get('/cities/', function(request, response) {
    // var cities = ['Providence', 'Boston', 'Dallas', 'Jacksonville', 'Boise'];
//     var name = request.params.name;
// 	var city = name[0].toUpperCase() + name.slice(1).toLowerCase();
// 	var state = cities[city];
// 	request.cityName = city;
	if(request.query.limit > cities.length) {
	    response.json("Limit can't be over " + cities.length)
	}
	
   else if (request.query.limit > 0) {
        response.json(cities.slice(0, request.query.limit));
    } else {
    response.json(Object.keys(cities));
    //linked cities displaying on index.html
    }
    //   var state = cities[request.params.state];
    // response.json(cities + state); 
    });
    
app.listen(process.env.PORT);

// app.get('/cities', function(request, response) {
// 	//  var cities = ['Providence', 'Boston', 'Dallas', 'Jacksonville', 'Boise'];
// 	if (request.query.limit >= 0) {
// 		response.json(cities.slice(0, request.query.limit));
// 	} else if (request.query.limit > cities.length) {
// 		response.status(404).json('your query was too large' + request.params.name);
// 		console.log("error");
// 	} else {
// 		response.json(cities);
// 	}
// });

// app.get('/cities/:name', function(request, response) {
// 	// var name = request.params.name;
// 	// var city = name[0].toUpperCase() + name.slice(1).toLowerCase();
// 	var state = cities[request.cityName];
// 	if (!state) {
// 		response.status(404).json(request.params.name + " not found");
// 	} else {
// 		response.json(state);
// 	}
// 	console.log("hi");
// });

