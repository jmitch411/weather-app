let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();


let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
let day = days[now.getDay()];

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
}

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${day} ${hours}:${minutes}`;


function displayForecast(response) {
    let forecast = response.data.daily;

    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;
    
    forecast.forEach(function (forecastDay, index) {
        if (index < 6) {
    forecastHTML = forecastHTML +
    `
    <div class="col-2">
    <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
    <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" width="60" />
    <div class="weather-forecast-temperatures">
    <span class="weather-forecast-temperature-max">
    ${Math.round(forecastDay.temp.max)}°
    </span>
    <span class="weather-forecast-temperature-min">
    ${Math.round(forecastDay.temp.min)}°
    </span>
    </div>
    </div>
    `;
        }
    });
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    let apiKey = "f8e6a9e3d6fde87cb38868da460b1371";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  celsiusTemperature = response.data.main.temp;

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
  let iconElement = document.querySelector("#icon");

  

  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  iconElement.setAttribute("alt", response.data.weather[0].icon);

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "f8e6a9e3d6fde87cb38868da460b1371";
  let apiUrl =
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;
  searchCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function searchLocation(position) {
let apiKey = "f8e6a9e3d6fde87cb38868da460b1371";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?&lat=${position.coords.latitude}&lon=${position.coords.latitude}&appid=${apiKey}&units=imperial`;
axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
event.preventDefault();
navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Miami");
