let weather = {
  apiKey: "bd5e378503939ddaee76f12ad7a97608", // Replace this with your actual OpenWeatherMap API key
  fetchWeather: function (city) {
    // Fetch latitude and longitude using OpenWeatherMap Geo API
    fetch(
      "http://api.openweathermap.org/geo/1.0/direct?q=" +
      city +
      "&limit=1&appid=" +
      this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("Location not found.");
          throw new Error("Location not found.");
        }
        return response.json();
      })
      .then((geoData) => {
        const { lat, lon } = geoData[0];

        // Fetch weather data using OpenWeatherMap Weather API with obtained coordinates
        return fetch(
          "https://api.openweathermap.org/data/2.5/weather?lat=" +
          lat +
          "&lon=" +
          lon +
          "&units=metric&appid=" +
          this.apiKey
        );
      })
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data))
      .catch((error) => console.error("Error:", error));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    weather.search();
  }
});

// Initial weather fetch for Delhi
weather.fetchWeather("delhi");
