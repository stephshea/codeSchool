/* global $ */
$(document).ready(function() {
       $.get('/cities', appendToList);
   
   function appendToList(cities) {
       var list = [];
       var content, city;
       for( var i in cities) {
           city = cities[i];
           content = '<a href="/cities/' +city+'">'+city+'</a> '+'<a href="#" data-city="'+city+'"><img src="del.jpg"></a>';
           list.push($('<li>', { text: cities[i] }));
       }
       $('#cityOps').append(list);
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
           appendToList([cityName]);
           form.trigger('reset');
});
});
});
   
   
