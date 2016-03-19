angular.module('wikiApp', [])
.controller('MainCtrl', function($scope, $http, $sce, wiki){
  $scope.trustAsHtml = $sce.trustAsHtml;
  $scope.query = "";
  $scope.search = function(){
    wiki($scope.query, function(results){
    console.log("Success: " + results.length);
      console.log(results[0]);
    $scope.results = results;
  });
  };
})
.factory('wiki', function($http){
  return function(query, callback) {
    var apiUrl = "http://en.wikipedia.org/w/api.php?callback=JSON_CALLBACK&format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=";
    apiUrl += query;
    
    $http.jsonp(apiUrl)
    .then(function(res){
      // console.log(res);
      callback(res.data.query.pages);
    })
    .catch(function(error){
      console.log("there was an error... ");
      console.log(error);
    })
  };
});