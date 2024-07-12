/*****OpenWeather API*****/

//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//https://api.openweathermap.org/data/2.5/weather?q=germany&appid=073448ffa403a7592cd4457098c2d674

const apiKey = "073448ffa403a7592cd4457098c2d674";

const currentWearherUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=imperial&q=";

const forecastUrl =
  "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function getWeather(city) {
  const response = await fetch(currentWearherUrl + city + `&appid=${apiKey}`);
  const response1 = await fetch(forecastUrl + city + `&appid=${apiKey}`);

  if (response.status == 404 && response1.status == 404) {
    // If the city name is invalid
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    const data = await response.json();
    const data1 = await response1.json();

    document.querySelector(".city").innerHTML =
      data.name + ", " + data.sys.country;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°F";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "img/clouds.png";
      document.querySelector(".card").style.background =
        "linear-gradient(150deg, #686868, #346688)";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "img/clear.png";
      document.querySelector(".card").style.background =
        "linear-gradient(150deg, #f1fffb, #3cb1ff)";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "img/rain.png";
      document.querySelector(".card").style.background =
        "linear-gradient(150deg, #686868, #346688)";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "img/drizzle.png";
      document.querySelector(".card").style.background =
        "linear-gradient(150deg, #686868, #346688)";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "img/mist.png";
      document.querySelector(".card").style.background =
        "linear-gradient(150deg, #686868, #346688)";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    displayHourlyForecast(data1.list);
  }
}

function displayHourlyForecast(hourlyData) {
  const hourlyForecastDiv = document.getElementById("hourly-forecast");

  const next24Hours = hourlyData.slice(0, 8); // Display the next 24 hours (3-hour intervals)

  next24Hours.forEach((item) => {
    const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
    const hour = dateTime.getHours();
    const temperature = Math.round(item.main.temp);
    const iconCode = item.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°F</span>
            </div>
        `;

    hourlyForecastDiv.innerHTML += hourlyItemHtml;
  });
}

searchBtn.addEventListener("click", () => {
  getWeather(searchBox.value);
});
