var app = angular.module('calcApp', []);

app.controller('MainCtrl', function($scope, $document) {
  $scope.runnerString = '';
  $scope.willClear = false;
  $scope.input = '';
  var operators = ['/', '*', '-', '+', '.'];

  $scope.updateRunnerString = function($event) {
    $scope.input = angular.element($event.currentTarget).text();

    if ((operators.indexOf($scope.input) === -1) && $scope.willClear) {
      $scope.clear();
    } else {
      $scope.willClear = false;
    }

    $scope.runnerString += $scope.input;
  };

  $scope.clear = function() {
    $scope.runnerString = '';
    $scope.willClear = false;
  };

  $scope.equals = function() {
    $scope.runnerString = eval($scope.runnerString) + '';
    $scope.willClear = true;
  };
});
