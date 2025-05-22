// =============================
//        FORMAT DATE
// =============================
function formatDate(date) {
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
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  return `${day} ${hours}:${minutes}`;
}

let now = new Date();
document.querySelector("#current-date").innerHTML = formatDate(now);

// =============================
//     DISPLAY TEMPERATURE
// =============================
function displayTemperature(response) {
  document.querySelector("#current-city").innerHTML = response.data.city;
  document.querySelector("#temperature").innerHTML =
    Math.round(response.data.temperature.current) + "°";
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity + "%";
  document.querySelector("#wind").innerHTML =
    Math.round(response.data.wind.speed) + " km/h";
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  document
    .querySelector(".weather-icon")
    .setAttribute("src", response.data.condition.icon_url);
  document
    .querySelector(".weather-icon")
    .setAttribute("alt", response.data.condition.description);
}

// =============================
//      DISPLAY FORECAST
// =============================
function displayForecast(response) {
  let forecastHTML = "";
  response.data.daily.slice(1, 6).forEach(function (day) {
    let date = new Date(day.time * 1000);
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let dayName = days[date.getDay()];

    forecastHTML += `
      <li>
        <h3>${dayName}</h3>
        <img src="${day.condition.icon_url}" alt="${
      day.condition.description
    }" width="48" />
        <p class="forecast-temperature">${Math.round(
          day.temperature.maximum
        )}°</p>
      </li>
    `;
  });
  document.querySelector(".forecast ul").innerHTML = forecastHTML;
}

// =============================
//        SEARCH FUNCTION
// =============================
function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value.trim();
  if (city.length < 2) return;

  let apiKey = "9f54b409ed45da3co73e59fb34ea8t3b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);

  let forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(forecastApiUrl).then(displayForecast);
}

// =============================
//        EVENT LISTENERS
// =============================
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let defaultCity = "Leiria";
let apiKey = "9f54b409ed45da3co73e59fb34ea8t3b";
let defaultUrl = `https://api.shecodes.io/weather/v1/current?query=${defaultCity}&key=${apiKey}&units=metric`;
axios.get(defaultUrl).then(displayTemperature);

let forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${defaultCity}&key=${apiKey}&units=metric`;
axios.get(forecastUrl).then(displayForecast);

// =============================
//     DARK MODE TOGGLE
// =============================
let toggleButton = document.querySelector("#dark-mode-toggle");
toggleButton.addEventListener("click", function () {
  document.body.classList.toggle("dark");
  toggleButton.textContent = document.body.classList.contains("dark")
    ? "Light Mode"
    : "Dark Mode";

  const logo = document.querySelector(".logo");
  if (document.body.classList.contains("dark")) {
    logo.setAttribute(
      "src",
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/166/410/original/Logo_sem_fundo.png?1747936347"
    );
  } else {
    logo.setAttribute(
      "src",
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/166/413/original/Logo_fundo_branco.png?1747937312"
    );
  }
});
