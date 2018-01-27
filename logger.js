module.exports = function(response, request, next) {
	var start = +new Date();
	var stream = process.stdout;
	var url = request.url;
	var method = request.method;
	response.on('finish', function() {
		// ^ event emitter ^ event listener callback    
		var duration = +new Date() - start;
		var message = method + ' to ' + url + '\ntook ' + duration + ' ms \n\n';
		console.log(message);
	});
	next();
}