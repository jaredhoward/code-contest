app.controller('challengesController', function(
	$scope, $rootScope, GetChallenges, GetUser, Logout) {
});

app.controller('challengeController', function(
  $scope, $routeParams, $rootScope, $http, GetLanguage, GetUser, Logout){
  $http.get('/api/get_challenge/'+$routeParams.challenge)
    .success(function(response) {
      $scope.challenge = response;
      if($scope.challenge)
        $scope.col = $scope.challenge.languages.length > 4 ? 4 : 12 / $scope.challenge.languages.length;
    })
    .error(function(response) {
      console.log(response);
    });
    
    if($routeParams.language) {
      $http.get('https://code-contest-denlight.c9.io/api/get_language/'+$routeParams.language)
      .success(function(response) {
        $scope.language = response;
      })
      .error(function(response) {
        console.log(response);
      });
    }

    $scope.language = $routeParams.language;

});

function stringifyRecursively (obj) {
  for(prop in obj) {
    if (typeof obj[prop] == 'object') {
      var subObj = obj[prop];
      if(subObj[0]) {
        for(var i=0;i<subObj.length;i++) {
          if (typeof subObj[i] == 'object') {
            stringifyRecursively(subObj[i]);
          } else {
            subObj[i] = JSON.stringify(subObj[i]);
          }
        }
      } else {
        subObj = JSON.stringify(subObj);
      }
      obj[prop] - subObj;
    }
  }
  obj = JSON.stringify(obj);
  return obj;
}

app.controller('UploadController', ['$scope', '$http', 'Upload', function (
  $scope, $http, Upload) {
    
  $scope.$watch('file', function () {
    if ($scope.file != null) {
      $scope.upload($scope.file); 
    }
  });

  // upload on file select or drop
  $scope.upload = function (file) {
    
    var fd = new FormData();
    fd.append('file', file);
    fd.append('language', stringifyRecursively($scope.language));
    fd.append('challenge', stringifyRecursively($scope.challenge));

    $http.post('/api/upload', fd, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    })
    .success(function(id){
      fd.append('submissionId', id);
      console.log(fd);
      //send 'fd' to Jared's backend magic
 
      $scope.success = true;
      document.getElementById('thanks').className='well';
      setTimeout(function(){
        window.location = '/challenges';
      },1000);
    })
    .error(function(err){
      console.log(err);
    });

  };
}]);