var latLng = {lat: 40.730610, lng: -73.935242};
var mapLocation = {
    center: latLng,
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP
}

var map = new google.maps.Map(document.getElementById("googleMaps"), mapLocation);

var directions = new google.maps.DirectionsService();

var directionsDisplay = new google.maps.DirectionsRenderer();

directionsDisplay.setMap(map);

function calculateRoute() {
    var request = {
    origin: document.getElementById("from").value,
    destination: document.getElementById("to").value,
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC
    }

    directions.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            const output = document.querySelector('#output');
            output.innerHTML = "From: " + document.getElementById("from").value + "<br />To: " + document.getElementById("to").value + "<br /> Driving distance : " + result.routes[0].legs[0].distance.text + "<br />Duration : " + result.routes[0].legs[0].duration.text;
        
            directionsDisplay.setDirections(result);
        } else {
            directionsDisplay.setDirections({routes: []});
            map.setCenter(latLng);
            output.innerHTML = "<div class='alert'> Could not retrieve driving distance! </div>" ;
        }
    });
}

var options = {
    types : ['(cities)']
}

var inputFrom = document.getElementById("from");
var autocompleteFrom = new google.maps.places.Autocomplete(inputFrom, options)

var inputTo = document.getElementById("to");
var autocompleteTo = new google.maps.places.Autocomplete(inputTo, options)