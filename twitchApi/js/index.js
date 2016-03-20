angular.module("twitchApp", [])
  .controller("MainCtrl", function($scope, twitch) {
    $scope.usernames = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff", "brunofin", "comster404", "eampiart"];
    $scope.twitchData = {
      "freecodecamp": {},
      "storbeck": {},
      "terakilobyte": {},
      "habathcx": {},
      "RobotCaleb": {},
      "thomasballinger": {},
      "noobs2ninjas": {},
      "beohoff": {},
      "brunofin": {},
      "comster404": {},
      "eampiart": {}
    };
    $scope.users = [];
    $scope.logoUrl_404 = "http://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_150x150.png";

    angular.forEach($scope.usernames, function(username) {
      var user = {username:username};
      twitch.getStream(username, function(data) {
        if (data.status === 422 || data.status === 404) {
          user.data = data;
          user.logoUrl = $scope.logoUrl_404;
          user.exists = false;
          $scope.users.push(user);
        } else {
          user.data = data;
          twitch.getUser(username, function(data){
            if (data.logo !== null) {
              user.logoUrl = data.logo;
            } else {
              user.logoUrl = $scope.logoUrl_404;
            }
            $scope.users.push(user);
          });
          user.exists = true;
          if (data.stream.channel !== null) {
            user.streaming = true;
          } else {
            user.streaming = false;
          }
        }
      });
    });
  })
  .factory("twitch", function($http, $log, time) {
    return {
     getStream: function(user, cb) {
      var apiUrl = "https://api.twitch.tv/kraken/streams/";
      apiUrl += user;
      apiUrl += "?callback=JSON_CALLBACK";

      $http.jsonp(apiUrl)
        .then(function(res) {
          // $log.debug(time + " success " + res.status);
          cb(res.data);
        })
        .catch(function(error) {
          $log.error(time + "error:");
          $log.info(error);
        });
    },
     getUser: function(user, cb) {
      var apiUrl = "https://api.twitch.tv/kraken/users/";
      apiUrl += user;
      apiUrl += "?callback=JSON_CALLBACK";

      $http.jsonp(apiUrl)
        .then(function(res) {
          // $log.debug(time + " success " + res.data.logo);
          cb(res.data);
        })
        .catch(function(error) {
          $log.error(time + "error:");
          $log.info(error);
        });
    },
      
    };
  })
  .factory('time', function($filter) {
    return $filter('date')(Date.now(), 'HH:mm:ss')
  });