function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours} ${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForcast(response) {
  let forcast = response.data.daily;
  let forcastElement = document.querySelector("#forcast");

  let days = ["Thu", "Fri", "Sat", "Sun"];
  let forcastHTML = `<div class="row">`;
  forcast.forEach(function (forcastDay, index) {
    if (index < 6) {
      forcastHTML =
        forcastHTML +
        `   
            <div class="col-2">
                <div class="weather-forcast-date">${formatDay(
                  forcastDay.dt
                )}</div>
               
                <img
                  src="https://openweathermap.org/img/wn/${
                    forcastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="36"
                />
                <div class="weather-forcast-temperature"></div>
                <span class="weather-forcast-temperature-max">
                 ${Math.round(forcastDay.temp.max)}° </span>
                <span class="weather-forcast-temperature-min">
                 ${Math.round(forcastDay.temp.min)}°</span>
            </div>
            
   `;
    }
  });

  forcastHTML = forcastHTML + `</div>`;
  forcastElement.innerHTML = forcastHTML;
}
function getForcast(coordinates) {
  console.log(coordinates);
  let apiKey = "082d3d02ffdb12f2fd9b259e2ced1d0d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  https: axios.get(apiUrl).then(displayForcast);
}
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForcast(response.data.coord);
}

function search(city) {
  let apiKey = "082d3d02ffdb12f2fd9b259e2ced1d0d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityinputElement = document.querySelector("#city-input");
  search(cityinputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("new York");
