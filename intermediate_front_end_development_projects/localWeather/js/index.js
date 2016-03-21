var app = angular.module("weatherApp", ["chart.js"]);

app.controller("MainCtrl", function($scope, location, weather, $filter, weatherIconFilter){
  $scope.units = "si";
  $scope.changeUnits = function(){
    if ($scope.units === "si") {
      $scope.units = "us";
      $scope.options.tooltipTemplate = "<%if (label){%><%=label%>: <%}%><%= value %>°F";
      $scope.weather = {};
      $scope.data = [[]];
      $scope.labels = [];
      $scope.updateWeather();
    } else {
      $scope.units = "si";
      $scope.options.tooltipTemplate = "<%if (label){%><%=label%>: <%}%><%= value %>°C";
      $scope.weather = {};
      $scope.data = [[]];
      $scope.labels = [];
      $scope.updateWeather();
    }
  };
  
  $scope.getWeather = function(){
    location(function(location){
      $scope.location = location;

      weather(location, $scope.units, function(weather){      
        $scope.weather = weather;
        console.log($scope.weather.currently.icon);
        $scope.populate();
      });
    });
  };
  
  $scope.updateWeather = function(){
    weather($scope.location, $scope.units, function(weather){      
        $scope.weather = weather;
        $scope.populate();
      });
  };
  
  $scope.data = [[]];
  $scope.labels = [];
  $scope.populate = function(){
    angular.forEach($scope.weather.daily.data, function(day){
      $scope.data[0].push(Math.round(day.temperatureMax));
      $scope.labels.push($filter('date')(day.time*1000, 'EEE'));
    });
  };
  $scope.options = {
    showScale: false,
    tooltipXPadding: 20,
    scaleBeginAtZero: true,
    responsive: true,
    maintainAspectRatio: false,
    datasetFill: false,
    datasetStrokeWidth: 3,
    pointDotRadius : 4,
   tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>°C"
  };
});

app.factory('weather', function($http, $log) {
  return function(location, units, callback) {
        var apiKey = "2b5d4fb33f3669eba1be18fe6f651183";
        var apiUrl = "https://crossorigin.me/https://api.forecast.io/forecast/" + apiKey + "/";
        apiUrl += location.latitude;
        apiUrl += ",";
        apiUrl += location.longitude;
        apiUrl += "?callback=JSON_CALLBACK";
        apiUrl += "&exclude=[minutely,hourly,flags]";
        apiUrl += "&units=" + units;
        // $log.info(apiUrl)
        
        // Used for production
        $http.jsonp(apiUrl, {})
          .then(function(res) {
            callback(res.data);
          })
          .catch(function(error) {
            $log.warn(error);
        });
    
        // Used for development, to not abuse forecast.io API
//         callback({
//   "latitude": 47.6473538,
//   "longitude": 9.1721135,
//   "timezone": "Europe/Zurich",
//   "offset": 1,
//   "currently": {
//     "time": 1458386497,
//     "summary": "Clear",
//     "icon": "clear-day",
//     "precipIntensity": 0,
//     "precipProbability": 0,
//     "temperature": 10.63,
//     "apparentTemperature": 10.63,
//     "dewPoint": 3.02,
//     "humidity": 0.59,
//     "windSpeed": 1.43,
//     "windBearing": 2,
//     "cloudCover": 0,
//     "pressure": 1017.73,
//     "ozone": 344.29
//   },
//   "daily": {
//     "summary": "Light rain on Tuesday and Friday, with temperatures bottoming out at 7°C on Friday.",
//     "icon": "rain",
//     "data": [
//       {
//         "time": 1458342000,
//         "summary": "Clear throughout the day.",
//         "icon": "clear-day",
//         "sunriseTime": 1458365343,
//         "sunsetTime": 1458408931,
//         "moonPhase": 0.38,
//         "precipIntensity": 0,
//         "precipIntensityMax": 0,
//         "precipProbability": 0,
//         "temperatureMin": -2.94,
//         "temperatureMinTime": 1458360000,
//         "temperatureMax": 12.33,
//         "temperatureMaxTime": 1458392400,
//         "apparentTemperatureMin": -2.94,
//         "apparentTemperatureMinTime": 1458360000,
//         "apparentTemperatureMax": 12.33,
//         "apparentTemperatureMaxTime": 1458392400,
//         "dewPoint": -0.29,
//         "humidity": 0.78,
//         "windSpeed": 0.86,
//         "windBearing": 40,
//         "cloudCover": 0,
//         "pressure": 1018.69,
//         "ozone": 351.43
//       },
//       {
//         "time": 1458428400,
//         "summary": "Partly cloudy starting in the evening.",
//         "icon": "partly-cloudy-night",
//         "sunriseTime": 1458451620,
//         "sunsetTime": 1458495417,
//         "moonPhase": 0.41,
//         "precipIntensity": 0,
//         "precipIntensityMax": 0,
//         "precipProbability": 0,
//         "temperatureMin": -4.08,
//         "temperatureMinTime": 1458446400,
//         "temperatureMax": 13.45,
//         "temperatureMaxTime": 1458478800,
//         "apparentTemperatureMin": -4.08,
//         "apparentTemperatureMinTime": 1458446400,
//         "apparentTemperatureMax": 13.45,
//         "apparentTemperatureMaxTime": 1458478800,
//         "dewPoint": 0.14,
//         "humidity": 0.81,
//         "windSpeed": 0.94,
//         "windBearing": 19,
//         "cloudCover": 0.08,
//         "pressure": 1017.59,
//         "ozone": 384.72
//       },
//       {
//         "time": 1458514800,
//         "summary": "Mostly cloudy throughout the day.",
//         "icon": "partly-cloudy-day",
//         "sunriseTime": 1458537897,
//         "sunsetTime": 1458581902,
//         "moonPhase": 0.44,
//         "precipIntensity": 0.0178,
//         "precipIntensityMax": 0.0305,
//         "precipIntensityMaxTime": 1458576000,
//         "precipProbability": 0.02,
//         "precipType": "rain",
//         "temperatureMin": -1.96,
//         "temperatureMinTime": 1458525600,
//         "temperatureMax": 10.56,
//         "temperatureMaxTime": 1458565200,
//         "apparentTemperatureMin": -2.93,
//         "apparentTemperatureMinTime": 1458518400,
//         "apparentTemperatureMax": 10.56,
//         "apparentTemperatureMaxTime": 1458565200,
//         "dewPoint": 0.78,
//         "humidity": 0.83,
//         "windSpeed": 1.61,
//         "windBearing": 21,
//         "cloudCover": 0.69,
//         "pressure": 1016,
//         "ozone": 388.75
//       },
//       {
//         "time": 1458601200,
//         "summary": "Drizzle in the evening.",
//         "icon": "rain",
//         "sunriseTime": 1458624175,
//         "sunsetTime": 1458668387,
//         "moonPhase": 0.47,
//         "precipIntensity": 0.0483,
//         "precipIntensityMax": 0.1499,
//         "precipIntensityMaxTime": 1458666000,
//         "precipProbability": 0.27,
//         "precipType": "rain",
//         "temperatureMin": -4.04,
//         "temperatureMinTime": 1458619200,
//         "temperatureMax": 11.03,
//         "temperatureMaxTime": 1458648000,
//         "apparentTemperatureMin": -4.04,
//         "apparentTemperatureMinTime": 1458619200,
//         "apparentTemperatureMax": 11.03,
//         "apparentTemperatureMaxTime": 1458648000,
//         "dewPoint": -0.16,
//         "humidity": 0.84,
//         "windSpeed": 1.34,
//         "windBearing": 24,
//         "cloudCover": 0.53,
//         "pressure": 1013.13,
//         "ozone": 393.53
//       },
//       {
//         "time": 1458687600,
//         "summary": "Partly cloudy starting in the afternoon, continuing until evening.",
//         "icon": "partly-cloudy-day",
//         "sunriseTime": 1458710452,
//         "sunsetTime": 1458754872,
//         "moonPhase": 0.5,
//         "precipIntensity": 0.0152,
//         "precipIntensityMax": 0.0279,
//         "precipIntensityMaxTime": 1458734400,
//         "precipProbability": 0.02,
//         "precipType": "snow",
//         "precipAccumulation": 0.31,
//         "temperatureMin": -5.07,
//         "temperatureMinTime": 1458702000,
//         "temperatureMax": 9.73,
//         "temperatureMaxTime": 1458741600,
//         "apparentTemperatureMin": -5.83,
//         "apparentTemperatureMinTime": 1458691200,
//         "apparentTemperatureMax": 8.28,
//         "apparentTemperatureMaxTime": 1458741600,
//         "dewPoint": -2.41,
//         "humidity": 0.81,
//         "windSpeed": 1.65,
//         "windBearing": 47,
//         "cloudCover": 0.23,
//         "pressure": 1011.9,
//         "ozone": 396.57
//       },
//       {
//         "time": 1458774000,
//         "summary": "Mostly cloudy starting in the afternoon.",
//         "icon": "partly-cloudy-night",
//         "sunriseTime": 1458796729,
//         "sunsetTime": 1458841357,
//         "moonPhase": 0.53,
//         "precipIntensity": 0.0356,
//         "precipIntensityMax": 0.0559,
//         "precipIntensityMaxTime": 1458824400,
//         "precipProbability": 0.06,
//         "precipType": "rain",
//         "temperatureMin": -4.7,
//         "temperatureMinTime": 1458784800,
//         "temperatureMax": 10.83,
//         "temperatureMaxTime": 1458824400,
//         "apparentTemperatureMin": -4.7,
//         "apparentTemperatureMinTime": 1458784800,
//         "apparentTemperatureMax": 10.83,
//         "apparentTemperatureMaxTime": 1458824400,
//         "dewPoint": -1.51,
//         "humidity": 0.78,
//         "windSpeed": 1.56,
//         "windBearing": 252,
//         "cloudCover": 0.38,
//         "pressure": 1012.75,
//         "ozone": 375.33
//       },
//       {
//         "time": 1458860400,
//         "summary": "Light rain until evening.",
//         "icon": "rain",
//         "sunriseTime": 1458883006,
//         "sunsetTime": 1458927842,
//         "moonPhase": 0.56,
//         "precipIntensity": 0.2794,
//         "precipIntensityMax": 0.9957,
//         "precipIntensityMaxTime": 1458921600,
//         "precipProbability": 0.69,
//         "precipType": "rain",
//         "temperatureMin": -0.48,
//         "temperatureMinTime": 1458867600,
//         "temperatureMax": 6.77,
//         "temperatureMaxTime": 1458900000,
//         "apparentTemperatureMin": -2.55,
//         "apparentTemperatureMinTime": 1458864000,
//         "apparentTemperatureMax": 5.77,
//         "apparentTemperatureMaxTime": 1458900000,
//         "dewPoint": 0.99,
//         "humidity": 0.87,
//         "windSpeed": 2.09,
//         "windBearing": 231,
//         "cloudCover": 0.94,
//         "pressure": 1016.1,
//         "ozone": 355.87
//       },
//       {
//         "time": 1458946800,
//         "summary": "Partly cloudy throughout the day.",
//         "icon": "partly-cloudy-day",
//         "sunriseTime": 1458969284,
//         "sunsetTime": 1459014327,
//         "moonPhase": 0.59,
//         "precipIntensity": 0.0178,
//         "precipIntensityMax": 0.0229,
//         "precipIntensityMaxTime": 1458950400,
//         "precipProbability": 0.01,
//         "precipType": "rain",
//         "temperatureMin": -3.49,
//         "temperatureMinTime": 1458950400,
//         "temperatureMax": 16.11,
//         "temperatureMaxTime": 1459000800,
//         "apparentTemperatureMin": -3.49,
//         "apparentTemperatureMinTime": 1458950400,
//         "apparentTemperatureMax": 16.11,
//         "apparentTemperatureMaxTime": 1459000800,
//         "dewPoint": 0.47,
//         "humidity": 0.79,
//         "windSpeed": 0.91,
//         "windBearing": 186,
//         "cloudCover": 0.31,
//         "pressure": 1018.42,
//         "ozone": 351.53
//       }
//     ]
//   }
// });
//         console.log("Loaded mock data...");
  };
});

app.factory('location', function(){
  return function(callback) {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position){
        callback(position.coords);
      });
    } else {
      console.log("geolocation not available");
    }
    };
});

app.filter('weatherIcon', function(){
  return function(input) {
    switch(input) {
      case "clear-day": return "wi-forecast-io-clear-day";
      case "clear-night": return "wi-forecast-io-clear-night";
      case "rain": return "wi-forecast-io-rain";
      case "snow": return "wi-forecast-io-snow";
      case "sleet": return "wi-forecast-io-sleet";
      case "wind": return "wi-forecast-io-wind";
      case "fog": return "wi-forecast-io-fog";
      case "cloudy": return "wi-forecast-io-cloudy";
      case "partly-cloudy-day": return "wi-forecast-io-partly-cloudy-day";
      case "partly-cloudy-night": return "wi-forecast-io-partly-cloudy-night";
      case "hail": return "wi-forecast-io-hail";
      case "thunderstorm": return "wi-forecast-io-thunderstorm";
      case "tornado": return "wi-forecast-io-tornado";
      default: return "wi-na";
    }
  };
});