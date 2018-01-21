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
   response.send('It is ' +date);
});

app.get('/cities', function(request, response) {
    response.sendFile(__dirname + '/public/index.html')
});

app.use(express.static('public'));

app.get('/cities', function(request, response) {
    var cities = ['Providence', 'Boston', 'Dallas', 'Jacksonville'];
    response.json(cities);
});

app.listen(process.env.PORT);

