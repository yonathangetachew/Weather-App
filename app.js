// WEATHER APP
// THESE ARE THE PACKAGES WE WILL USE FOR OUR APPLICATION!!!!
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

// Here we created our route for URL to Page.html
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/page.html");
});

// Here we will implement our API CALL to our URL

app.post("/", function (req, res) {
  const cityName = req.body.cityName;
  let lat = "";
  let lon = "";
  const url2 = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName},US&appid=642eefe2827fe35d4c2696e21cd4b29f`;
  https.get(url2, function (response) {
    response.on("data", function (data) {
      const jsondata2 = JSON.parse(data);
      lat = jsondata2[0].lat;
      lon = jsondata2[0].lon;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=642eefe2827fe35d4c2696e21cd4b29f&units=imperial`;
      https.get(url, function (response) {
        response.on("data", function (data) {
          const jsondata = JSON.parse(data);
          const temp = jsondata.main.temp;
          const des = jsondata.weather[0].description;
          const icon = jsondata.weather[0].icon;
          const imageurl =
            "http://openweathermap.org/img/wn/" + icon + "@2x.png";
          const humidity = jsondata.main.humidity;
          const wind = jsondata.wind.speed;
          res.write(`<h1>The temp in ${cityName} is ${temp} degrees</h1><br>`);
          res.write(`<p>The weather description is ${des}</p><br>`);
          res.write(`<img src= ${imageurl}><br>`);
          res.write(`<p>The Humidity is ${humidity}%</p><br>`);
          res.write(`<p>The winds are traveling SW at ${wind} mph</p><br>`);
        });
      });
    });
  });
});

app.listen(9000);
