let weather = {
    apiKey: "67b92f0af5416edbfe58458f502b0a31",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      console.log(data);
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
      document.querySelector(".time").innerText = 
        "Time: " + getTime(data.timezone);
      document.querySelector(".weather").classList.remove("loading");
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
  weather.fetchWeather("Patna");

  let getTime = timezone => {
    var today = new Date();  
    var localoffset = -(today.getTimezoneOffset() * 60);
    var destoffset = timezone; 

  var offset = destoffset-localoffset;
  var d = new Date( new Date().getTime() + offset * 1000);
  let hours = d.getHours();
  let mins = d.getMinutes();
  let endS = "AM";
  if (hours > 12) {
    hours -= 12;
    endS = "PM";
  }

  if (hours < 10) {
    hours = "0" + hours;
  } 

  if (mins < 10) {
    mins = "0" + mins;
  }

  let res = hours + ":" + mins + " " + endS;
  return res;
  };