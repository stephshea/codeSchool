/* global $ */
$(document).ready(function() {
       $.get('/cities', appendToOptions);
   
   function appendToOptions(cities) {
       var options = [];
       var content, city;
       for( var i in cities) {
           city = cities[i];
           content = '<a href="/cities/' +city+'">'+city+'</a> '+'<a href="#" data-city="'+city+'"><img src="del.jpg"></a>';
           options.push($('<option>', { text: cities[i] }));
       }
       $('#cityOps').append(options);
   }
});

    
$(function(){
    $('form').on('submit', function(event) {
       event.preventDefault();
       var form =$(this);
       var cityData = form.serialize();
       
       $.ajax({
           type: 'POST', url: '/cities', data: cityData
           
        }).done(function(cityName) {
           appendToOptions([cityName]);
           form.trigger('reset');
});
});
});
   
   
