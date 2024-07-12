/*****OpenWeather API*****/

//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//https://api.openweathermap.org/data/2.5/weather?q=germany&appid=073448ffa403a7592cd4457098c2d674

const apiKey = "073448ffa403a7592cd4457098c2d674";

const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=imperial&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    //if the city name is invalid
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();

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
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
