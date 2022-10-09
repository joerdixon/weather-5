// DOM SELECTORS
const searchButton = document.getElementById("search-button");
const searchBar = document.getElementById("search-bar");

// Functions --------------------------------------------------
// Gets coordinates for the location based on a city name.
function getCoordinates(cityName) {
    fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=db5145c3b2e95938686d1418d4647b00").then(
        function (response) {
        return response.json();
      }).then(function (data) {
        getWeather(data[0].lat, data[0].lon);
    });
}
// Gets weather for a location based on coordinates.
function getWeather(lat, lon) {
    fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=db5145c3b2e95938686d1418d4647b00").then(
        function (response) {
        return response.json();
      }).then(function (data) {console.log(data);});
} 

getCoordinates("tokyo");

searchButton.addEventListener("click", function() {
    getCoordinates(searchBar.value);
})