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

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${day} ${hours}:${minutes}`;

function displayForecast() {
    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;
    let days = ["Thu", "Fri", "Sat", "Sun"];
    days.forEach(function (day) {
    forecastHTML = forecastHTML +
    `
    <div class="col-2">
    <div class="weather-forecast-date">${day}</div>
    <img src="http://openweathermap.org/img/wn/03n@2x.png" width="60" />
    <div class="weather-forecast-temperatures">
    <span class="weather-forecast-temperature-max">
    18°
    </span>
    <span class="weather-forecast-temperature-min">
    12°
    </span>
    </div>
    </div>
    `;
    })
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
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
}

function searchCity(city) {
  let apiKey = "f8e6a9e3d6fde87cb38868da460b1371";
  let apiUrl =
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;
  searchCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);



function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

let celsiusTemperature = null;



let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

function showCelsiusTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);


function searchLocation(position) {
let apiKey = "f8e6a9e3d6fde87cb38868da460b1371";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?&lat=${position.coords.latitude}&lon=${position.coords.latitude}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
event.preventDefault();
navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Miami");
displayForecast();
