let now = new Date();
console.log(now);

let h6 = document.querySelector("h6");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
minutes = minutes <= 9 ? "0" + minutes : minutes;

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

h6.innerHTML = `${day}, ${month} ${date}, ${hours}:${minutes}`;

function showTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);

  let temperatureElement = document.querySelector("#current");
  temperatureElement.innerHTML = `${temperature}°C`;

  let city = document.querySelector("#searched-city");
  city.innerHTML = response.data.name;

  let legenda = document.querySelector("#desc");
  legenda.innerHTML = response.data.weather[0].description;

  let tempmm = document.querySelector("#maxmin");
  let tempmax = Math.round(response.data.main.temp_max);
  let tempmin = Math.round(response.data.main.temp_min);
  tempmm.innerHTML = `🌡 Temperature: ${tempmin}°C/${tempmax}°C`;

  let humidity = document.querySelector("#hum");
  let humi = Math.round(response.data.main.humidity);
  humidity.innerHTML = `☁ Humidity: ${humi}%`;

  let wind = document.querySelector("#speed");
  let speed = Math.round(response.data.wind.speed);
  wind.innerHTML = `💨 Wind: ${speed}km/h`;

  let suntime = document.querySelector("#sunrise");
  let sun = new Date(response.data.sys.sunrise * 1000);
  suntime.innerHTML = `🌅 Sunrise: ${sun.getHours()}:${sun.getMinutes()}`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  celsiusTemperature = response.data.main.temp;
}

function search(event) {
  event.preventDefault();
  let town = document.querySelector("#search-text");
  let apiKey = "ad1eb22819c3bc6f5b85f058b30086c5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${town.value}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#current");
  celsiuslink.classList.remove("active");
  fahrenheitlink.classList.add("active");
  temperatureElement.innerHTML = `${Math.round(fahrenheitTemperature)}°F`;
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiuslink.classList.add("active");
  fahrenheitlink.classList.remove("active");
  let temperatureElement = document.querySelector("#current");
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°C`;
}

let celsiusTemperature = null;

let fahrenheitlink = document.querySelector("#fahrenheit");
fahrenheitlink.addEventListener("click", displayFahrenheitTemperature);

let celsiuslink = document.querySelector("#celsius");
celsiuslink.addEventListener("click", displayCelsiusTemperature);

let searchEngine = document.querySelector("#search-form");
searchEngine.addEventListener("submit", search);
