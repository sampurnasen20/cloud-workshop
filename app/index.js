const express = require("express");
const bodyParser = require('body-parser');
const request = require('request');

const tools = require('./util');
const app = express();

const apiKey = 'ebf5e5843530b4f8cf4c0bd17b6b6048';
const baseAPI = 'http://api.openweathermap.org/data/2.5/forecast/daily'

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render('index', {weather: null, error: null});
});

app.get("/weather/:city/:weekday?" , (req, res) => {
    let city = req.params.city;
    let weekday = req.params.weekday;
    weeklyForecast = [];
    const url = `${baseAPI}?q=${city}&type=like&units=metric&cnt=7&APPID=${apiKey}`
    
    request(url, function (err, response, body) {
        const weather = JSON.parse(body);

        if (err || weather.cod == '401') {
          res.render('index', {weather: null, weatherIcon: null, city: null, error: 'Error, please try again'});
        } else {
            weeklyForecast = tools.generateWeeklyForcast(weather);

            if (weekday == null || weekday == 'today') {
                weatherIcon = tools.getIconFilename(weeklyForecast[0].iconCode);
                res.render('index', {weather: weeklyForecast[0], weatherIcon: weatherIcon, city: city, error: null});
            } else {
                let weatherObj = weeklyForecast.find(obj => obj.day.toLowerCase() == weekday.toLowerCase());
                weatherIcon = tools.getIconFilename(weatherObj.iconCode);
                res.render('index', {weather: weatherObj, weatherIcon: weatherIcon, city: city, error: null});
            }
        }
      });
});

module.exports = app