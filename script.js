const apiKey = "9a6c716964bf19c295c1ae00bca4007a";  // <-- apna OpenWeatherMap API key daalna
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// selectors
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    if (response.status == 404) {
      document.querySelector(".city").innerText = "City not found";
      document.querySelector(".temp").innerText = "--°C";
      document.querySelector(".humidity").innerText = "--%";
      document.querySelector(".wind").innerText = "-- km/h";
      weatherIcon.src = "";
      return;
    }

    let data = await response.json();

    // update UI
    document.querySelector(".city").innerText = data.name;
    document.querySelector(".temp").innerText = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerText = data.main.humidity + "%";
    document.querySelector(".wind").innerText = data.wind.speed + " km/h";

    // weather icon update
    if (data.weather[0].main === "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main === "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main === "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main === "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
      weatherIcon.src = "images/mist.png";
    } else {
      weatherIcon.src = "images/clear.png"; // fallback
    }

  } catch (error) {
    console.log("Error fetching weather:", error);
  }
}

// button click
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

// enter key press
searchBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkWeather(searchBox.value);
  }
});
