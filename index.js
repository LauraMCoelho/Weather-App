let now = new Date();
console.log(now);

let h6 = document.querySelector("h6");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
minutes = minutes <= 9 ? "0" + minutes : minutes;
let year = now.getFullYear();

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

h6.innerHTML = `${day}, ${month} ${date}, ${hours}:${minutes}, ${year}`;

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  console.log(response.data);

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
}

function search(event) {
  event.preventDefault();
  let town = document.querySelector("#search-text");
  let apiKey = "ad1eb22819c3bc6f5b85f058b30086c5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${town.value}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let searchEngine = document.querySelector("#search-form");
searchEngine.addEventListener("submit", search);
