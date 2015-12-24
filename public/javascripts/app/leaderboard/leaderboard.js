app.controller('leaderboardController', function(
	$scope, GetChallenges, Logout, GetUser) {
});

app.controller('leaderboardChallengeController', function(
	$scope, $routeParams, $http, ActiveTab, GetChallenge, Logout, GetUser) {
		
	GetChallenge.get_challenge($routeParams.challenge);
  
  $http({
    method: 'GET',
    url: '/api/get_submitions/challange/' + $routeParams.challenge
  }).then(function successCallback(res){
    $scope.submitions = res.data;
  }, function errorCallback(err){
    console.log(err);
  });
  
	$scope.setLanguage = function(lang) {
		$scope.currentLanguage = lang;
	};
});