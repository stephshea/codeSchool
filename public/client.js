/* global $ */
$(function(){
   
   $.get('/cities', appendToSelect);
   
   function appendToSelect(cities) {
       var cities = ['Providence', 'Boston', 'Dallas', 'Jacksonville'];
       for( var i in cities) {
           cities.push($('<option>', { text: cities[i] }));
       }
       $('.cities').append(cities);
   }

});