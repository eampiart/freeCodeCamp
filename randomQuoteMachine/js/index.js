var app = angular.module('randomQuoteMachine', []);

app.controller('MainCtrl', function($scope, $log, quotes){
  $scope.colors = ["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548", "#9E9E9E", "#607D8B"];
  $scope.randomColor;
  $scope.random = function() {
    return Math.floor(Math.random() * ($scope.colors.length));
  };
  $scope.style = {};
  $scope.quote = {};
  $scope.encodedQuote;
  $scope.getQuote = function(){    
    quotes.getQuote(function(quote){
      $scope.quote = quote;
      $scope.encodedQuote = encodeURI(quote.quote + " - " + quote.author);
      $scope.randomColor = $scope.colors[$scope.random()];
      $scope.style["background-color"] = $scope.randomColor;
      $scope.style["color"] = $scope.randomColor;
    });
  };
});

app.factory('quotes', function($http, $log){
    var apiUrl = "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=movies";
    var headers =  {"X-Mashape-Key": "aFeMyyNcrpmshs9NPB4gOuCgLAOEp15FafMjsnXBaIu1HPNdLy"};
  
    return {
      getQuote: function(callback) {
        $http.get(apiUrl, {headers:headers})
        .then(function(response) {
          var quote = {};
          quote.quote = response.data.quote;
          quote.author = response.data.author;
          callback(quote);
        })
        .catch(function(response) {
          $log.warn(response.statusText);
        })
      }
    }
});