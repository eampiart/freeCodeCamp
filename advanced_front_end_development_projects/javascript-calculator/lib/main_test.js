describe('Calculator', function() {
  beforeEach(angular.mock.module('calcApp'));

  var $controller;
  beforeEach(inject(function(_$controller_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  var $scope, controller;
  beforeEach(function() {
      $scope = {};
      controller = $controller('MainCtrl', {$scope: $scope});
    });

  it('can add two numbers', function() {
    $scope.runnerString = '2+2';
    $scope.equals();
    expect($scope.runnerString).toBe('4');
  });

  it('can subtract two numbers', function() {
    $scope.runnerString = '9-3';
    $scope.equals();
    expect($scope.runnerString).toBe('6');
  });

  it('can multiply two numbers', function() {
    $scope.runnerString = '2*3';
    $scope.equals();
    expect($scope.runnerString).toBe('6');
  });

  it('can divide two numbers', function() {
    $scope.runnerString = '6/2';
    $scope.equals();
    expect($scope.runnerString).toBe('3');
  });

  it('can clear the input', function() {
    $scope.runnerString = '6/2+3';
    $scope.clear();
    expect($scope.runnerString).toBe('');
  });

  it('can chain multiple operations together', function() {
    $scope.runnerString = '6/2+3-9+3*7/4';
    $scope.equals();
    expect($scope.runnerString).toBe('2.25');
  });
});
