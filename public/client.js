/* global $ */
$(function(){
   
   $.get('/cities', appendToOptions);
   
   function appendToOptions(cities) {
       var options = [];
       for( var i in cities) {
           options.push($('<option>', { text: cities[i] }));
       }
       $('#cityOps').append(options);
   }

});