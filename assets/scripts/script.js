// DOM SELECTORS
// Search Section
const searchButton = document.getElementById("search-button");
const searchBar = document.getElementById("search-bar");
// History Section
const history = document.getElementById("history");
// Current Weather Display
const cityDate = document.getElementById("citywdate")
const curTemp = document.getElementById("cur-temp")
const curWind = document.getElementById("cur-wind")
const curHumidity = document.getElementById("cur-humidity")

// Functions --------------------------------------------------
// Gets coordinates for the location based on a city name.
function getCoordinates(cityName) {
    fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=db5145c3b2e95938686d1418d4647b00").then(
        function (response) {
        return response.json();
      }).then(function (data) {
        // Manipulate data here
        getWeather(data[0].lat, data[0].lon);
        getFiveDay(data[0].lat, data[0].lon);
    });
}

// Gets weather for a location based on coordinates.
function getWeather(lat, lon) {
    fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=db5145c3b2e95938686d1418d4647b00&units=imperial").then(
        function (response) {
        return response.json();
      }).then(function (data) {
        // Create, set and append each statistic for the current location. Temp, Wind, Humidity.
        cityDate.textContent = data.name;
        curTemp.textContent = "Temp: " + data.main.temp + " deg";
        curWind.textContent = "Wind: " + data.wind.speed + " mph";
        curHumidity.textContent = "Humidity: " + data.main.humidity + "%";
    });  
} 

// Gets 5 day forecast for a location based on coordinates
function getFiveDay(lat, lon) {
    let someUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=db5145c3b2e95938686d1418d4647b00&cnt=40&units=imperial`;
    fetch(someUrl).then(
        function (response) {
        return response.json();
      }).then(function (data) {
        for (let i = 0; i < 5; i++) {
            // Select new weather card
            let someFiveDay = document.querySelector("[data-day='" + i + "']")
            someFiveDay.innerHTML=''

            // Create the date and icon elements, append together then to page.
            let someDate = document.createElement("h3");
            someDate.textContent = i;

            // Icon
            let someIcon = document.createElement("img");
            someIcon.setAttribute("alt", "weather icon")
            someDate.appendChild(someIcon);
            someFiveDay.appendChild(someDate);
            // Temp
            let someTemp = document.createElement("p");
            someTemp.textContent = "Temp: " + data.list[i * 8].main.temp + " deg";
            someFiveDay.appendChild(someTemp);
            // Wind
            let someWind = document.createElement("p");
            someWind.textContent = "Wind: " + data.list[i * 8].wind.speed + " mph";
            someFiveDay.appendChild(someWind);
            // Humidity
            let someHumidity = document.createElement("p");
            someHumidity.textContent = "Humidity: " + data.list[i * 8].main.humidity + "%";
            someFiveDay.appendChild(someHumidity);
        }
        // Create history entry
        let newHistory = document.createElement("div");
        newHistory.setAttribute("class", "historyTab");
        newHistory.textContent = data.city.name;
        history.appendChild(newHistory);
        newHistory.addEventListener("click", function (e) {
            e.preventDefault();
            getCoordinates(e.target.innerText)
            console.log(e.target.innerText);
        });

        localStorage.setItem(data.city.name, someUrl);
        // Manipulate data here
    });
}

// EVENT LISTENERS --------------------------------------------

// Searches on click.
searchButton.addEventListener("click", function() {
    getCoordinates(searchBar.value);
})





getCoordinates("Seattle");

// PSEUDOCODE

/* 
WHEN I LOAD THE PAGE:
    I see the last weather information I searched for displayed.
    The history bar has my past searches.

WHEN I TYPE A CITY AND HIT "SEARCH":
    Construct a url based on what was entered
    Gather and display weather information for that city currently.
    Gather and display 5 day forcast.
    Add the city to the history bar...
    IF THAT CITY DOES NOT EXIST:
        Do not save that city to the history bar.
        Display a notification that the city was not found.

WHEN I CLICK A CITY IN MY HISTORY BAR":
    The content on page is reflected as if I had just searched that city.

*/